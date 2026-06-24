import { useRef, useState } from 'react'
import {
  Box,
  Display,
  Text,
  Badge,
  Button,
  ChatInput,
  Skeleton,
  IconButton,
  Card,
  CardHeader,
  CardHeaderLeading,
  CardHeaderTrailing,
  CardHeaderBadge,
  CardBody,
  Tabs,
  TabList,
  TabItem,
  TabPanel,
  CheckCircleIcon,
  CloseIcon,
} from '@razorpay/blade/components'
import styled from 'styled-components'
import { BladeRenderer, collectComponents, type BladeNode } from './BladeRenderer'
import { matchTemplate } from './templates'

type Status = 'idle' | 'building' | 'done'

const chatBgUrl = new URL('../assets/chat bg.avif', import.meta.url).href

/** Decorative full-bleed background image layer (Blade Box can't take an image). */
const ChatBackdrop = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(
      color-mix(in srgb, ${({ theme }) => theme.colors.surface.text.staticWhite.normal} 35%, transparent),
      color-mix(in srgb, ${({ theme }) => theme.colors.surface.text.staticWhite.normal} 35%, transparent)
    ),
    url(${chatBgUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`

/** Keeps the Blade Display (font + color tokens) but pins the title to 2rem. */
const BigTitle = styled.div`
  & h1,
  & span {
    font-size: 2rem !important;
    line-height: 1.1;
  }
`

/** Centers the hero; animates its height so it glides up when a result appears. */
const Hero = styled.div<{ $idle: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${(p) => (p.$idle ? '80vh' : '20vh')};
  transition: min-height 520ms cubic-bezier(0.22, 1, 0.36, 1);
`

const EXAMPLE_PROMPTS = [
  'A payment success screen',
  'A pricing plans page',
  'A login form',
  'A KYC upload step',
]

export function Studio() {
  const [prompt, setPrompt] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [activeTab, setActiveTab] = useState('preview')
  const [spec, setSpec] = useState<BladeNode | null>(null)
  const [matchLabel, setMatchLabel] = useState('')
  const timerRef = useRef<number | null>(null)

  const handleBuild = () => {
    const text = prompt.trim()
    if (!text || status === 'building') return
    setActiveTab('preview')
    setStatus('building')
    setSpec(null)
    // brief delay so the chat-input shows its "generating" state
    timerRef.current = window.setTimeout(() => {
      const match = matchTemplate(text)
      setMatchLabel(match.label)
      setSpec(match.spec)
      setStatus('done')
    }, 600)
  }

  const handleStop = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setStatus('idle')
  }

  const handleClose = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setStatus('idle')
    setSpec(null)
    setMatchLabel('')
  }

  const usedComponents = spec ? collectComponents(spec) : []

  return (
    <ChatBackdrop>
      <Box
        as="main"
        maxWidth="960px"
        marginX="auto"
        width="100%"
        paddingX={{ base: 'spacing.5', l: 'spacing.7' }}
        paddingTop={{ base: 'spacing.7', m: 'spacing.10' }}
        paddingBottom="spacing.9"
      >
      {/* Centered hero — glides up when a result appears */}
      <Hero $idle={status === 'idle'}>
        <Box display="flex" flexDirection="column" alignItems="center" gap="spacing.5" width="100%">
        <BigTitle>
          <Display size="xlarge" weight="semibold" textAlign="center">
            What should we build?
          </Display>
        </BigTitle>

        {/* The one chat-style input row — submit button lives inside it */}
        <Box width="100%" maxWidth="640px" display="flex" flexDirection="column" gap="spacing.4" marginTop="spacing.3">
          <ChatInput
            accessibilityLabel="Describe what to build"
            placeholder="Describe any screen, flow, or component…"
            value={prompt}
            onChange={({ value }) => setPrompt(value)}
            onSubmit={handleBuild}
            isGenerating={status === 'building'}
            onStop={handleStop}
            suggestions={EXAMPLE_PROMPTS}
            onSuggestionAccept={({ suggestion }) => setPrompt(suggestion)}
          />

          <Box display="flex" flexWrap="wrap" gap="spacing.3" justifyContent="center">
            {EXAMPLE_PROMPTS.map((ex) => (
              <Button key={ex} size="xsmall" variant="tertiary" onClick={() => setPrompt(ex)}>
                {ex}
              </Button>
            ))}
          </Box>
        </Box>
        </Box>
      </Hero>

      {/* Result appears below once you build */}
      {status !== 'idle' && (
        <Box marginTop="spacing.8" width="100%">
          <Box display="flex" justifyContent="flex-end" marginBottom="spacing.3">
            <IconButton icon={CloseIcon} accessibilityLabel="Close preview" onClick={handleClose} />
          </Box>
          <Card width="100%" elevation="midRaised">
            <CardHeader>
              <CardHeaderLeading
                title="Preview canvas"
                subtitle={prompt ? `“${prompt}”` : 'Your build appears here'}
              />
              <CardHeaderTrailing
                visual={
                  <CardHeaderBadge color={status === 'done' ? 'positive' : 'neutral'}>
                    {status === 'done' ? matchLabel || 'Built' : 'Building…'}
                  </CardHeaderBadge>
                }
              />
            </CardHeader>

            <CardBody>
              {status === 'building' && (
                <Box paddingY="spacing.4" display="flex" flexDirection="column" gap="spacing.4">
                  <Text size="small" color="surface.text.gray.subtle">
                    Assembling Blade components…
                  </Text>
                  <Skeleton width="55%" height="spacing.7" borderRadius="medium" />
                  <Skeleton width="100%" height="spacing.5" borderRadius="medium" />
                  <Skeleton width="88%" height="spacing.5" borderRadius="medium" />
                  <Skeleton width="100%" height="spacing.9" borderRadius="medium" />
                  <Skeleton width="40%" height="spacing.5" borderRadius="medium" />
                </Box>
              )}

              {status === 'done' && (
                <Tabs value={activeTab} onChange={setActiveTab}>
                  <TabList>
                    <TabItem value="preview">Preview</TabItem>
                    <TabItem value="mapping">How it maps</TabItem>
                  </TabList>

                  <TabPanel value="preview">
                    <Box paddingTop="spacing.5" display="flex" flexDirection="column" gap="spacing.4">
                      {spec ? <BladeRenderer node={spec} /> : null}
                    </Box>
                  </TabPanel>

                  <TabPanel value="mapping">
                    <Box paddingTop="spacing.5" display="flex" flexDirection="column" gap="spacing.3">
                      {usedComponents.length === 0 && (
                        <Text color="surface.text.gray.subtle">
                          Components used by the generated screen appear here.
                        </Text>
                      )}
                      {usedComponents.map((name) => (
                        <Box
                          key={name}
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          gap="spacing.4"
                          paddingY="spacing.3"
                          paddingX="spacing.4"
                          backgroundColor="surface.background.gray.moderate"
                          borderRadius="medium"
                        >
                          <Text weight="medium">{name}</Text>
                          <Badge color="positive" emphasis="subtle" icon={CheckCircleIcon}>
                            Blade
                          </Badge>
                        </Box>
                      ))}
                    </Box>
                  </TabPanel>
                </Tabs>
              )}
            </CardBody>
          </Card>
        </Box>
      )}
      </Box>
    </ChatBackdrop>
  )
}
