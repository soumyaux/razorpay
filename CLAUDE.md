# Razorpay — Blade Design System Project

This project builds UI **exclusively** with Razorpay's **Blade Design System**
(`@razorpay/blade`). The single most important rule: **the output must never
differ from Razorpay's design language.**

## Core principles (always-on)

- **Real Blade components + tokens** — no raw hex, no magic px where a token
  exists. If Blade has a token or component for it, use it; never hand-roll a
  value Blade already names.
- **Accessible and responsive by default** — every build ships labelled
  controls, contrast-safe colors, ≥44px touch targets, and a layout that works
  mobile → desktop. These are not a final pass; they are baked into each piece
  as it's built.

## Non-negotiable rules

1. **Blade is the only component source.**
   - Use only components exported from `@razorpay/blade/components`.
   - Do **not** use Impact UI, raw HTML elements for UI (use `Box`, `Text`,
     `Heading`, `Display` instead of `div`/`span`/`p`/`h1`), or any other
     component library.
   - Verify props/usage with the Blade MCP `get_blade_component_docs` before
     writing a component — never guess prop names.

2. **No raw values — tokens only.** The image (or design) gives *intent*;
   Blade's token system decides the *exact value*.
   - **Colors** → Blade color tokens (e.g. `surface.background.primary.intense`,
     `feedback.text.positive.intense`). Never raw hex.
   - **Spacing / padding / gap** → `spacing.*` tokens (4px-based scale, e.g.
     `spacing.3`, `spacing.5`, `spacing.7`). Never raw px.
   - **Typography** → `Display`, `Heading`, `Text` with their `size`/`weight`
     props. Inter font is built in. Never raw font-size/family.
   - **Radius / elevation / shadows** → Blade radius & elevation tokens.

3. **Layout = `Box`.** All structure/composition uses `Box` with Blade layout
   props (`display`, `flexDirection`, `gap`, `padding`, etc.). No CSS files for
   layout, no inline styles with raw values.

4. **Theme + provider.** UI must render inside Blade's provider/theme so tokens
   resolve correctly. Keep the light theme unless told otherwise.

5. **Accessible & responsive by default.** Every control has a visible/`a11y`
   label, color pairs stay contrast-safe, interactive targets are ≥44px, and
   layout adapts mobile → desktop using Blade's responsive props (e.g.
   `padding={{ base: 'spacing.4', m: 'spacing.7' }}`). Build it in from the
   start — never bolt it on at the end.

## Image → Blade workflow (use the `image-to-blade` skill)

When the user sends an image to recreate, **always**:

1. **Analyze** — break the screen into its UI pieces.
2. **Match** each piece to a real Blade component; verify with
   `get_blade_component_docs`.
3. **Report** a match list in three buckets:
   - ✅ **Exact match** — rebuild as-is.
   - 🟡 **Close match** — name the Blade substitute; user approves.
   - 🔴 **No match** — stop and ask the user (closest alt vs. custom build).
4. **Never** silently substitute, invent a non-existent component, or skip a
   piece without flagging it.
5. **Only after the user confirms the report** → build it, using tokens per the
   rules above.

## Known gaps to always surface
- **Icons** not in Blade's `Icons` set → pick closest, tell the user the swap.
- **Custom illustrations / logos / images** → assets, not components; ask user
  to provide or use a placeholder.
- **Charts** — Blade has Area/Bar/Line/Donut only. Pie/scatter/gauge/etc. →
  flag as 🔴 no match.
- **Widgets Blade lacks** (kanban, rich-text editor, calendar heatmap, etc.) →
  🔴 stop and ask.

## Available Blade components (semantic names)
Accordion, ActionList, Alert, Amount, AnimateInteractions, AreaChart,
AutoComplete, Avatar, Badge, BarChart, BottomNav, BottomSheet, Box, Breadcrumb,
Button, ButtonGroup, Card, Carousel, ChatInput, ChatMessage, Checkbox, Chip,
Code, Collapsible, Counter, CounterInput, DatePicker, Display, Divider,
DonutChart, Drawer, Dropdown, Elevate, EmptyState, Fade, FileUpload, Heading,
IconButton, Icons, Indicator, InfoGroup, InputGroup, LightBox, LineChart, Link,
List, ListView, Menu, Modal, Morph, Move, OTPInput, Pagination, PasswordInput,
PhoneNumberInput, Popover, Preview, ProgressBar, QuickFilter, Radio, Scale,
SearchInput, SelectInput, SideNav, Skeleton, Slide, Spinner, Stagger,
StepGroup, Switch, Table, Tabs, Tag, Text, TextArea, TextInput, TimePicker,
Toast, Tooltip, TopNav, VisuallyHidden

> Use semantic components: `PasswordInput` for passwords, `SearchInput` for
> search, `PhoneNumberInput` for phone, `Amount` for money, etc.

## Tooling
- **Blade MCP** is connected (`blade-mcp`). Key tools:
  - `get_blade_component_docs` — props/usage for components (call before coding).
  - `get_blade_pattern_docs` / `get_blade_general_docs` — patterns & tokens.
  - `get_figma_to_code` — convert a Figma node directly to Blade code.
  - `get_blade_changelog` — version-specific changes.
- Installed: `@razorpay/blade@^12.98.1`, React 18, Vite, TypeScript,
  styled-components, framer-motion.
- Dev: `npm run dev` · Build: `npm run build` · Lint: `npm run lint` (oxlint).
