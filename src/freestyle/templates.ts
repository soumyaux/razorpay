import type { BladeNode } from './BladeRenderer'

/** A curated Blade screen, matched to a prompt by keywords. No API needed. */
type Template = {
  label: string
  keywords: string[]
  spec: BladeNode
}

const TEMPLATES: Template[] = [
  {
    label: 'Login screen',
    keywords: ['login', 'log in', 'sign in', 'signin', 'auth'],
    spec: {
      type: 'card',
      title: 'Welcome back',
      subtitle: 'Sign in to your Razorpay account',
      children: [
        { type: 'input', label: 'Email', placeholder: 'you@company.com', inputType: 'email' },
        { type: 'password', label: 'Password', placeholder: '••••••••' },
        { type: 'checkbox', label: 'Keep me signed in' },
        { type: 'button', text: 'Sign in', variant: 'primary', isFullWidth: true },
        { type: 'text', text: 'Forgot password?', size: 'small', color: 'surface.text.gray.subtle' },
      ],
    },
  },
  {
    label: 'Sign up screen',
    keywords: ['signup', 'sign up', 'register', 'create account', 'onboard'],
    spec: {
      type: 'card',
      title: 'Create your account',
      subtitle: 'Start accepting payments in minutes',
      children: [
        { type: 'input', label: 'Full name', placeholder: 'Jane Doe' },
        { type: 'input', label: 'Work email', placeholder: 'you@company.com', inputType: 'email' },
        { type: 'password', label: 'Create password', placeholder: '••••••••' },
        { type: 'checkbox', label: 'I agree to the Terms of Service' },
        { type: 'button', text: 'Create account', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Payment success',
    keywords: ['payment success', 'success', 'paid', 'receipt', 'thank you', 'confirmation', 'confirmed'],
    spec: {
      type: 'card',
      children: [
        {
          type: 'box',
          direction: 'column',
          gap: 'spacing.4',
          align: 'center',
          children: [
            { type: 'badge', text: 'Payment successful', color: 'positive', emphasis: 'subtle' },
            { type: 'amount', value: 1999, currency: 'INR' },
            { type: 'text', text: 'Paid to Acme Tech Pvt Ltd · 25 Jun 2026', color: 'surface.text.gray.subtle' },
            { type: 'divider' },
            { type: 'button', text: 'Download receipt', variant: 'secondary', isFullWidth: true },
            { type: 'button', text: 'Done', variant: 'primary', isFullWidth: true },
          ],
        },
      ],
    },
  },
  {
    label: 'Checkout',
    keywords: ['checkout', 'pay', 'payment page', 'cart', 'order', 'buy'],
    spec: {
      type: 'card',
      title: 'Checkout',
      subtitle: 'Acme Tech Pvt Ltd',
      children: [
        { type: 'box', direction: 'row', justify: 'space-between', children: [
          { type: 'text', text: 'Subtotal', color: 'surface.text.gray.subtle' },
          { type: 'text', text: '₹1,799', weight: 'medium' },
        ] },
        { type: 'box', direction: 'row', justify: 'space-between', children: [
          { type: 'text', text: 'GST (18%)', color: 'surface.text.gray.subtle' },
          { type: 'text', text: '₹200', weight: 'medium' },
        ] },
        { type: 'divider' },
        { type: 'box', direction: 'row', justify: 'space-between', align: 'center', children: [
          { type: 'text', text: 'Total payable', weight: 'semibold' },
          { type: 'amount', value: 1999, currency: 'INR' },
        ] },
        { type: 'input', label: 'Email for receipt', placeholder: 'you@company.com', inputType: 'email' },
        { type: 'button', text: 'Pay ₹1,999', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Pricing plans',
    keywords: ['pricing', 'plans', 'subscription', 'tiers', 'upgrade'],
    spec: {
      type: 'box',
      direction: 'row',
      gap: 'spacing.5',
      wrap: true,
      children: [
        { type: 'card', title: 'Starter', subtitle: 'For new businesses', children: [
          { type: 'amount', value: 0, currency: 'INR' },
          { type: 'text', text: '2% per transaction', color: 'surface.text.gray.subtle' },
          { type: 'button', text: 'Get started', variant: 'secondary', isFullWidth: true },
        ] },
        { type: 'card', title: 'Growth', badge: { text: 'Popular', color: 'positive' }, subtitle: 'For scaling teams', children: [
          { type: 'amount', value: 2999, currency: 'INR' },
          { type: 'text', text: '1.5% per transaction', color: 'surface.text.gray.subtle' },
          { type: 'button', text: 'Choose Growth', variant: 'primary', isFullWidth: true },
        ] },
        { type: 'card', title: 'Enterprise', subtitle: 'Custom volume pricing', children: [
          { type: 'text', text: 'Custom', weight: 'semibold' },
          { type: 'text', text: 'Dedicated support', color: 'surface.text.gray.subtle' },
          { type: 'button', text: 'Contact sales', variant: 'secondary', isFullWidth: true },
        ] },
      ],
    },
  },
  {
    label: 'Refund request',
    keywords: ['refund', 'return', 'cancel order', 'dispute'],
    spec: {
      type: 'card',
      title: 'Request a refund',
      subtitle: 'Order #RZP-90241',
      children: [
        { type: 'select', label: 'Reason for refund', placeholder: 'Select a reason', options: ['Duplicate charge', 'Product not received', 'Wrong item', 'Other'] },
        { type: 'input', label: 'Refund amount', placeholder: '1999', inputType: 'number' },
        { type: 'textarea', label: 'Additional details', placeholder: 'Tell us what happened…' },
        { type: 'alert', description: 'Refunds typically reach the source account in 5–7 business days.', color: 'information' },
        { type: 'button', text: 'Submit request', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'KYC / document upload',
    keywords: ['kyc', 'verification', 'verify', 'document', 'upload', 'identity'],
    spec: {
      type: 'card',
      title: 'Complete your KYC',
      subtitle: 'Verify your business to activate payouts',
      children: [
        { type: 'select', label: 'Document type', placeholder: 'Select document', options: ['PAN card', 'Aadhaar', 'GST certificate', 'Passport'] },
        { type: 'input', label: 'Document number', placeholder: 'ABCDE1234F' },
        { type: 'alert', title: 'Upload required', description: 'Attach a clear photo of your document (JPG or PDF, under 5 MB).', color: 'notice' },
        { type: 'button', text: 'Submit for verification', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Settings / profile',
    keywords: ['settings', 'profile', 'account', 'preferences', 'edit profile'],
    spec: {
      type: 'card',
      title: 'Account settings',
      subtitle: 'Manage your profile and preferences',
      children: [
        { type: 'input', label: 'Display name', placeholder: 'Jane Doe' },
        { type: 'input', label: 'Email', placeholder: 'you@company.com', inputType: 'email' },
        { type: 'select', label: 'Default currency', placeholder: 'Select currency', options: ['INR', 'USD', 'EUR', 'GBP'] },
        { type: 'checkbox', label: 'Email me transaction alerts' },
        { type: 'divider' },
        { type: 'button', text: 'Save changes', variant: 'primary' },
      ],
    },
  },
  {
    label: 'Dashboard overview',
    keywords: ['dashboard', 'overview', 'home', 'analytics', 'metrics', 'stats'],
    spec: {
      type: 'box',
      direction: 'column',
      gap: 'spacing.5',
      children: [
        { type: 'heading', text: 'Good morning, Jane', size: 'large' },
        { type: 'box', direction: 'row', gap: 'spacing.5', wrap: true, children: [
          { type: 'card', title: "Today's volume", children: [ { type: 'amount', value: 84200, currency: 'INR' }, { type: 'badge', text: '+12% vs yesterday', color: 'positive', emphasis: 'subtle' } ] },
          { type: 'card', title: 'Successful payments', children: [ { type: 'heading', text: '1,284', size: 'large' }, { type: 'text', text: '98.2% success rate', color: 'surface.text.gray.subtle' } ] },
          { type: 'card', title: 'Pending payouts', children: [ { type: 'amount', value: 23900, currency: 'INR' }, { type: 'text', text: 'Settles tomorrow', color: 'surface.text.gray.subtle' } ] },
        ] },
        { type: 'button', text: 'View all transactions', variant: 'secondary' },
      ],
    },
  },
  {
    label: 'Contact / feedback form',
    keywords: ['contact', 'feedback', 'support', 'help', 'message', 'enquiry', 'inquiry'],
    spec: {
      type: 'card',
      title: 'Get in touch',
      subtitle: "We'll get back within one business day",
      children: [
        { type: 'input', label: 'Name', placeholder: 'Jane Doe' },
        { type: 'input', label: 'Email', placeholder: 'you@company.com', inputType: 'email' },
        { type: 'select', label: 'Topic', placeholder: 'Select a topic', options: ['Billing', 'Integration', 'Account', 'Other'] },
        { type: 'textarea', label: 'Message', placeholder: 'How can we help?' },
        { type: 'button', text: 'Send message', variant: 'primary', isFullWidth: true },
      ],
    },
  },
]

/** A generic form used when nothing matches confidently. */
function fallbackSpec(prompt: string): BladeNode {
  return {
    type: 'card',
    title: prompt.length > 48 ? `${prompt.slice(0, 48)}…` : prompt || 'Untitled screen',
    subtitle: 'A starter Blade layout for your request',
    children: [
      { type: 'input', label: 'Title', placeholder: 'Enter a title' },
      { type: 'textarea', label: 'Description', placeholder: 'Add some details…' },
      { type: 'select', label: 'Category', placeholder: 'Choose one', options: ['Option A', 'Option B', 'Option C'] },
      { type: 'checkbox', label: 'Mark as important' },
      { type: 'button', text: 'Continue', variant: 'primary', isFullWidth: true },
    ],
  }
}

/** Score each template by keyword hits; return the best match (or a fallback). */
export function matchTemplate(prompt: string): { label: string; spec: BladeNode } {
  const text = prompt.toLowerCase()
  let best: Template | null = null
  let bestScore = 0
  for (const tpl of TEMPLATES) {
    let score = 0
    for (const kw of tpl.keywords) {
      if (text.includes(kw)) score += kw.includes(' ') ? 2 : 1
    }
    if (score > bestScore) {
      bestScore = score
      best = tpl
    }
  }
  if (best && bestScore > 0) return { label: best.label, spec: best.spec }
  return { label: 'Custom layout', spec: fallbackSpec(prompt) }
}
