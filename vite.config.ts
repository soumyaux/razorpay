import { defineConfig, loadEnv } from 'vite'
import type { Plugin, Connect } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

/**
 * System prompt: turns a free-form request into a Blade UI spec (JSON tree).
 * The renderer only knows Blade components, so the output is always on-system.
 */
const SYSTEM_PROMPT = `You generate UIs for Razorpay's Blade Design System.
Given a user request (a screen, flow, or component), output a SINGLE JSON object
describing the UI as a tree of nodes. Output ONLY raw JSON — no markdown, no prose.

Allowed node types (use ONLY these):
- {"type":"box","direction":"row|column","gap":"spacing.N","padding":"spacing.N","align":"center|flex-start|flex-end|stretch","justify":"center|flex-start|flex-end|space-between","background":"surface.background.gray.subtle|surface.background.gray.moderate|surface.background.primary.subtle","wrap":true,"children":[...]}
- {"type":"card","title":"...","subtitle":"...","badge":{"text":"...","color":"positive|information|notice|negative|neutral"},"children":[...]}
- {"type":"display","text":"...","size":"small|medium|large|xlarge"}
- {"type":"heading","text":"...","size":"small|medium|large|xlarge|2xlarge"}
- {"type":"text","text":"...","size":"xsmall|small|medium|large","weight":"regular|medium|semibold","color":"surface.text.gray.subtle|surface.text.gray.muted|feedback.text.positive.intense"}
- {"type":"badge","text":"...","color":"positive|information|notice|negative|neutral|primary","emphasis":"subtle|intense"}
- {"type":"button","text":"...","variant":"primary|secondary|tertiary","isFullWidth":true}
- {"type":"input","label":"...","placeholder":"...","inputType":"text|email|number|search"}
- {"type":"password","label":"...","placeholder":"..."}
- {"type":"textarea","label":"...","placeholder":"..."}
- {"type":"select","label":"...","placeholder":"...","options":["...","..."]}
- {"type":"checkbox","label":"..."}
- {"type":"amount","value":1999,"currency":"INR"}
- {"type":"divider"}
- {"type":"alert","title":"...","description":"...","color":"information|positive|notice|negative"}

Rules:
- Root node should usually be {"type":"box","direction":"column","gap":"spacing.5","children":[...]} or a card.
- Spacing values must be one of spacing.0 through spacing.11.
- Write realistic, specific content for the request (labels, button text, amounts, copy).
- Keep it to one focused screen: roughly 5–16 nodes. Group related fields in a card.
- Never invent node types or props outside this list.`

function parseSpec(text: string): unknown {
  let t = text.trim()
  const fence = t.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (fence) t = fence[1].trim()
  const start = t.indexOf('{')
  const end = t.lastIndexOf('}')
  if (start !== -1 && end !== -1) t = t.slice(start, end + 1)
  return JSON.parse(t)
}

function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
      if (data.length > 1_000_000) req.destroy()
    })
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {})
      } catch (err) {
        reject(err)
      }
    })
    req.on('error', reject)
  })
}

async function generateSpec(apiKey: string, prompt: string): Promise<unknown> {
  const { default: Anthropic } = await import('@anthropic-ai/sdk')
  const client = new Anthropic({ apiKey })
  const response = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  })
  const text = response.content
    .filter((block): block is Extract<typeof block, { type: 'text' }> => block.type === 'text')
    .map((block) => block.text)
    .join('')
  return parseSpec(text)
}

/** Dev-server endpoint that holds the API key and calls Claude. */
function bladeStudioApi(apiKey: string): Plugin {
  return {
    name: 'blade-studio-api',
    configureServer(server) {
      server.middlewares.use(
        '/api/generate',
        async (req: IncomingMessage, res: ServerResponse, next: Connect.NextFunction) => {
          if (req.method !== 'POST') return next()
          res.setHeader('content-type', 'application/json')
          try {
            const body = await readJson(req)
            const prompt = String(body.prompt ?? '').slice(0, 1000)
            if (!prompt.trim()) {
              res.statusCode = 400
              res.end(JSON.stringify({ error: 'empty_prompt' }))
              return
            }
            if (!apiKey) {
              res.statusCode = 200
              res.end(JSON.stringify({ error: 'no_api_key' }))
              return
            }
            const spec = await generateSpec(apiKey, prompt)
            res.statusCode = 200
            res.end(JSON.stringify({ spec }))
          } catch (err) {
            res.statusCode = 500
            res.end(JSON.stringify({ error: err instanceof Error ? err.message : 'generation_failed' }))
          }
        },
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), basicSsl(), bladeStudioApi(env.ANTHROPIC_API_KEY ?? '')],
    server: {
      // Expose on the local network (so a phone can reach it) over HTTPS,
      // which browsers require before they allow gyroscope / device-motion.
      host: true,
    },
  }
})
