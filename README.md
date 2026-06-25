# AI x Design Meetup — Razorpay Blade

A demo app built **exclusively** with Razorpay's [Blade Design System](https://blade.razorpay.com/)
(`@razorpay/blade`). Every piece of UI uses real Blade components and design
tokens — no raw hex, spacing, or fonts — so the result never drifts from
Razorpay's design language.

The app has two parts:

- **Level 1 — Event Page** — a pixel-faithful recreation of the "AI x Design
  Meetup @Razorpay" event page (hero, sidebar, details, share sheet), rebuilt
  entirely from Blade components, with a light/dark theme toggle.
- **Level 2 — Freestyle Studio** — describe any screen in plain language and it
  generates an on-system Blade UI. With an Anthropic API key it uses live AI;
  without one it falls back to **offline mode** (hand-picked Blade templates),
  so the app runs with no key.

## Tech stack

- [@razorpay/blade](https://blade.razorpay.com/) — the only component source
- React 18 + TypeScript + Vite
- styled-components, framer-motion
- Oxlint

## Getting started

```bash
npm install
npm run dev
```

The dev server runs over **HTTPS** on your local network (via
`@vitejs/plugin-basic-ssl`) — this is required for the mobile gyroscope, which
browsers only allow in a secure context. Open the `https://192.168.x.x:…` URL on
your phone and accept the self-signed certificate warning.

### Enabling live AI (Level 2)

Live generation is optional. To enable it, add an Anthropic API key:

```bash
cp .env.example .env.local
# then edit .env.local and set ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at [console.anthropic.com](https://console.anthropic.com/). The key is
read only by the local dev server and is never bundled into the client.
Without a key, Level 2 runs in offline mode.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (HTTPS, LAN-exposed) |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

## Custom enhancements

A few touches go beyond the stock Blade component set:

- **3D gyroscope-tilt share banner (mobile)** — a custom enhancement built on
  `framer-motion` and the Device Orientation API. The share banner tilts as you
  move your phone (and follows the pointer on desktop). It is *not* a Blade
  component; it wraps Blade content in a custom motion layer and asks for iOS
  motion permission on first interaction.

## Notes

- UI renders inside Blade's provider/theme; light theme by default.
- Built to be accessible and responsive by default (labelled controls,
  contrast-safe tokens, ≥44px touch targets, mobile → desktop layouts).
