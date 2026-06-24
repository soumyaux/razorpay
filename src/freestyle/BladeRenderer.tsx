import type { ReactNode } from 'react'
import {
  Box,
  Display,
  Heading,
  Text,
  Badge,
  Button,
  TextInput,
  PasswordInput,
  TextArea,
  SelectInput,
  Dropdown,
  DropdownOverlay,
  ActionList,
  ActionListItem,
  Checkbox,
  Amount,
  Divider,
  Alert,
  Card,
  CardHeader,
  CardHeaderLeading,
  CardHeaderTrailing,
  CardHeaderBadge,
  CardBody,
} from '@razorpay/blade/components'

/** A single node in the generated Blade UI spec. */
export type BladeNode = {
  type: string
  text?: string
  label?: string
  placeholder?: string
  inputType?: string
  size?: string
  weight?: string
  color?: string
  emphasis?: string
  variant?: string
  isFullWidth?: boolean
  direction?: string
  gap?: string
  padding?: string
  align?: string
  justify?: string
  background?: string
  wrap?: boolean
  title?: string
  subtitle?: string
  description?: string
  badge?: { text?: string; color?: string }
  value?: number
  currency?: string
  options?: string[]
  children?: BladeNode[]
}

// ---- Token allowlists: anything off-list falls back to a safe default ----
const SPACINGS = ['spacing.0', 'spacing.1', 'spacing.2', 'spacing.3', 'spacing.4', 'spacing.5', 'spacing.6', 'spacing.7', 'spacing.8', 'spacing.9', 'spacing.10', 'spacing.11']
const TEXT_COLORS = ['surface.text.gray.normal', 'surface.text.gray.subtle', 'surface.text.gray.muted', 'surface.text.primary.normal', 'feedback.text.positive.intense', 'feedback.text.negative.intense', 'feedback.text.notice.intense', 'feedback.text.information.intense']
const BOX_BG = ['transparent', 'surface.background.gray.subtle', 'surface.background.gray.moderate', 'surface.background.gray.intense', 'surface.background.primary.subtle', 'surface.background.primary.intense', 'surface.background.cloud.subtle', 'surface.background.cloud.intense']
const FEEDBACK = ['information', 'negative', 'neutral', 'notice', 'positive']

type Token = string | undefined
const pick = (val: Token, allowed: string[], fallback?: string): string | undefined =>
  val && allowed.includes(val) ? val : fallback

const slug = (s: string, i: number) => `${s.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${i}` || `opt-${i}`

function renderNode(node: BladeNode, key: string): ReactNode {
  if (!node || typeof node !== 'object') return null

  switch (node.type) {
    case 'box':
      return (
        <Box
          key={key}
          display="flex"
          flexDirection={node.direction === 'row' ? 'row' : 'column'}
          flexWrap={node.wrap ? 'wrap' : 'nowrap'}
          gap={pick(node.gap, SPACINGS, 'spacing.4') as never}
          padding={pick(node.padding, SPACINGS) as never}
          alignItems={pick(node.align, ['center', 'flex-start', 'flex-end', 'stretch', 'baseline'])}
          justifyContent={pick(node.justify, ['center', 'flex-start', 'flex-end', 'space-between', 'space-around', 'space-evenly'])}
          backgroundColor={pick(node.background, BOX_BG) as never}
          borderRadius={node.background ? 'medium' : undefined}
          width="100%"
        >
          {(node.children ?? []).map((child, i) => renderNode(child, `${key}.${i}`))}
        </Box>
      )

    case 'card': {
      const hasHeader = Boolean(node.title || node.subtitle || node.badge?.text)
      return (
        <Card key={key} backgroundColor="surface.background.gray.subtle" padding="spacing.5" width="100%" elevation="lowRaised">
          {hasHeader && (
            <CardHeader>
              <CardHeaderLeading title={node.title ?? ' '} subtitle={node.subtitle} />
              {node.badge?.text && (
                <CardHeaderTrailing
                  visual={
                    <CardHeaderBadge color={pick(node.badge.color, FEEDBACK, 'neutral') as never}>
                      {node.badge.text}
                    </CardHeaderBadge>
                  }
                />
              )}
            </CardHeader>
          )}
          <CardBody>
            <Box display="flex" flexDirection="column" gap="spacing.4">
              {(node.children ?? []).map((child, i) => renderNode(child, `${key}.${i}`))}
            </Box>
          </CardBody>
        </Card>
      )
    }

    case 'display':
      return (
        <Display key={key} size={pick(node.size, ['small', 'medium', 'large', 'xlarge'], 'small') as never}>
          {node.text}
        </Display>
      )

    case 'heading':
      return (
        <Heading key={key} size={pick(node.size, ['small', 'medium', 'large', 'xlarge', '2xlarge'], 'medium') as never}>
          {node.text}
        </Heading>
      )

    case 'text':
      return (
        <Text
          key={key}
          size={pick(node.size, ['xsmall', 'small', 'medium', 'large'], 'medium') as never}
          weight={pick(node.weight, ['regular', 'medium', 'semibold'], 'regular') as never}
          color={pick(node.color, TEXT_COLORS) as never}
        >
          {node.text}
        </Text>
      )

    case 'badge':
      return (
        <Badge
          key={key}
          color={pick(node.color, [...FEEDBACK, 'primary'], 'neutral') as never}
          emphasis={pick(node.emphasis, ['subtle', 'intense'], 'subtle') as never}
        >
          {node.text ?? ''}
        </Badge>
      )

    case 'button':
      return (
        <Box key={key} display="flex">
          <Button
            variant={pick(node.variant, ['primary', 'secondary', 'tertiary'], 'primary') as never}
            isFullWidth={Boolean(node.isFullWidth)}
          >
            {node.text ?? 'Button'}
          </Button>
        </Box>
      )

    case 'input':
      return (
        <TextInput
          key={key}
          label={node.label || 'Input'}
          placeholder={node.placeholder}
          type={pick(node.inputType, ['text', 'email', 'number', 'search', 'url', 'telephone'], 'text') as never}
        />
      )

    case 'password':
      return (
        <PasswordInput
          key={key}
          label={node.label || 'Password'}
          placeholder={node.placeholder}
        />
      )

    case 'textarea':
      return (
        <TextArea
          key={key}
          label={node.label || 'Details'}
          placeholder={node.placeholder}
          numberOfLines={3}
        />
      )

    case 'select':
      return (
        <Dropdown key={key} selectionType="single">
          <SelectInput
            label={node.label || 'Select'}
            placeholder={node.placeholder ?? 'Select an option'}
          />
          <DropdownOverlay>
            <ActionList>
              {(node.options ?? []).map((opt, i) => (
                <ActionListItem key={slug(opt, i)} title={opt} value={slug(opt, i)} />
              ))}
            </ActionList>
          </DropdownOverlay>
        </Dropdown>
      )

    case 'checkbox':
      return <Checkbox key={key}>{node.label ?? ''}</Checkbox>

    case 'amount':
      return (
        <Amount
          key={key}
          value={Number(node.value) || 0}
          currency={(node.currency ?? 'INR') as never}
          type="heading"
          size="large"
        />
      )

    case 'divider':
      return <Divider key={key} />

    case 'alert':
      return (
        <Alert
          key={key}
          title={node.title}
          description={node.description ?? ''}
          color={pick(node.color, ['information', 'positive', 'notice', 'negative'], 'information') as never}
          isDismissible={false}
        />
      )

    default:
      return null
  }
}

/** Collect the Blade components used by a spec — powers the "How it maps" tab. */
const NODE_TO_BLADE: Record<string, string> = {
  box: 'Box',
  card: 'Card',
  display: 'Display',
  heading: 'Heading',
  text: 'Text',
  badge: 'Badge',
  button: 'Button',
  input: 'TextInput',
  password: 'PasswordInput',
  textarea: 'TextArea',
  select: 'SelectInput + Dropdown',
  checkbox: 'Checkbox',
  amount: 'Amount',
  divider: 'Divider',
  alert: 'Alert',
}

export function collectComponents(node: BladeNode | null, found = new Set<string>()): string[] {
  if (node && NODE_TO_BLADE[node.type]) found.add(NODE_TO_BLADE[node.type])
  node?.children?.forEach((child) => collectComponents(child, found))
  return [...found]
}

export function BladeRenderer({ node }: { node: BladeNode }) {
  return <Box width="100%">{renderNode(node, 'root')}</Box>
}
