---
name: image-to-blade
description: Recreate a UI from an image using ONLY Razorpay's Blade Design System. Use whenever the user sends/attaches an image, screenshot, or mockup and wants it built, recreated, matched, or "made the same". Analyzes the image, matches every UI piece to a real Blade component, reports matches in exact/close/no-match buckets, and only builds after the user confirms — using Blade tokens (never raw hex/px/fonts) so the result never differs from Razorpay.
---

# Image → Blade

Recreate UI from an image so it **never differs from Razorpay's Blade Design
System**. The image gives *intent*; Blade decides the *exact value*.

## Hard rules
- **Blade only.** Components from `@razorpay/blade/components` exclusively. No
  Impact UI, no other libraries, no raw HTML UI elements (use `Box`/`Text`/
  `Heading`/`Display`).
- **Tokens, never raw values.** Colors → Blade color tokens. Spacing → `spacing.*`.
  Fonts → `Display`/`Heading`/`Text` props. Radius/elevation → Blade tokens.
- **Verify before coding.** Call `get_blade_component_docs` for every component
  you plan to use; never guess prop names.
- **Never** silently substitute, invent a non-existent component, or skip a UI
  piece without flagging it.

## Procedure

### Step 1 — Analyze the image
Break the screen into discrete UI pieces top-to-bottom: layout regions, nav,
inputs, buttons, cards, tables, badges, charts, modals, typography, icons,
images. List them.

### Step 2 — Match each piece to a Blade component
Map every piece to a semantic Blade component. Prefer semantic ones:
`PasswordInput`, `SearchInput`, `PhoneNumberInput`, `Amount`, `SelectInput`,
`Dropdown`, etc. Layout/composition → `Box`.

### Step 3 — Report the match list (ALWAYS, before building)
Present three buckets so the user sees everything, including gaps:

- ✅ **Exact match** — Blade has it 1:1. Rebuild as-is.
- 🟡 **Close match** — nearest Blade component / nearest token. Name the
  substitute and the visual difference; user approves.
- 🔴 **No match** — Blade has no equivalent. **Stop and ask** the user: closest
  alternative or custom build?

Use a table: `Image piece | Blade component | Bucket | Notes`.

### Step 4 — Resolve gaps with the user
Wait for confirmation on 🟡 and 🔴 items. Do not build past an unresolved 🔴.

### Step 5 — Build
Only after confirmation. Use `Box` layout + Blade tokens throughout. Render
inside Blade's provider/theme. After building, offer to run `npm run dev`.

## Known gap handling
- **Icons** not in Blade's `Icons` set → closest icon, tell the user the swap.
- **Illustrations / logos / photos** → assets, not components; ask user to
  provide or use a placeholder.
- **Charts** — Blade has only AreaChart, BarChart, LineChart, DonutChart.
  Pie/scatter/gauge/etc. → 🔴 no match.
- **Missing widgets** (kanban, rich-text editor, calendar heatmap, etc.) → 🔴
  stop and ask.
- **Color/spacing/font between two tokens** → pick nearest, list in 🟡 bucket.

## Tools
- `get_blade_component_docs` — props/usage (call before coding each component).
- `get_blade_pattern_docs` — for Header/Sidebar/Dashboard-style patterns.
- `get_blade_general_docs` — tokens, theming, layout fundamentals.
- `get_figma_to_code` — if the user gives a Figma URL instead of an image.

## Available Blade components
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
