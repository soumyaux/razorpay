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
  {
    label: 'OTP verification',
    keywords: ['otp', 'verify code', 'verification code', 'two factor', '2fa', 'one time', 'confirm code'],
    spec: {
      type: 'card',
      title: 'Enter the code',
      subtitle: 'We sent a 6-digit code to +91 ••••• 43210',
      children: [
        { type: 'input', label: 'Verification code', placeholder: '••• •••', inputType: 'number' },
        { type: 'button', text: 'Verify', variant: 'primary', isFullWidth: true },
        { type: 'text', text: "Didn't get it? Resend in 0:28", size: 'small', color: 'surface.text.gray.subtle' },
      ],
    },
  },
  {
    label: 'Reset password',
    keywords: ['reset password', 'forgot password', 'change password', 'recover'],
    spec: {
      type: 'card',
      title: 'Reset your password',
      subtitle: "Enter your email and we'll send a reset link",
      children: [
        { type: 'input', label: 'Email', placeholder: 'you@company.com', inputType: 'email' },
        { type: 'button', text: 'Send reset link', variant: 'primary', isFullWidth: true },
        { type: 'text', text: 'Back to sign in', size: 'small', color: 'surface.text.gray.subtle' },
      ],
    },
  },
  {
    label: 'Invoice',
    keywords: ['invoice', 'bill', 'statement'],
    spec: {
      type: 'card',
      title: 'Invoice #INV-2041',
      subtitle: 'Due 30 Jun 2026',
      badge: { text: 'Unpaid', color: 'notice' },
      children: [
        { type: 'box', direction: 'row', justify: 'space-between', children: [
          { type: 'text', text: 'Design retainer', color: 'surface.text.gray.subtle' },
          { type: 'text', text: '₹40,000', weight: 'medium' },
        ] },
        { type: 'box', direction: 'row', justify: 'space-between', children: [
          { type: 'text', text: 'GST (18%)', color: 'surface.text.gray.subtle' },
          { type: 'text', text: '₹7,200', weight: 'medium' },
        ] },
        { type: 'divider' },
        { type: 'box', direction: 'row', justify: 'space-between', align: 'center', children: [
          { type: 'text', text: 'Amount due', weight: 'semibold' },
          { type: 'amount', value: 47200, currency: 'INR' },
        ] },
        { type: 'button', text: 'Pay invoice', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Transactions list',
    keywords: ['transactions', 'transaction', 'payments list', 'history', 'activity', 'ledger'],
    spec: {
      type: 'card',
      title: 'Recent transactions',
      children: [
        { type: 'box', direction: 'row', justify: 'space-between', align: 'center', children: [
          { type: 'text', text: 'Acme Tech · Today', weight: 'medium' },
          { type: 'amount', value: 1999, currency: 'INR' },
        ] },
        { type: 'divider' },
        { type: 'box', direction: 'row', justify: 'space-between', align: 'center', children: [
          { type: 'text', text: 'Globex · Yesterday', weight: 'medium' },
          { type: 'amount', value: 8499, currency: 'INR' },
        ] },
        { type: 'divider' },
        { type: 'box', direction: 'row', justify: 'space-between', align: 'center', children: [
          { type: 'text', text: 'Initech · 22 Jun', weight: 'medium' },
          { type: 'badge', text: 'Refunded', color: 'notice', emphasis: 'subtle' },
        ] },
        { type: 'button', text: 'See all', variant: 'tertiary' },
      ],
    },
  },
  {
    label: 'Profile card',
    keywords: ['profile card', 'user profile', 'my profile', 'bio'],
    spec: {
      type: 'card',
      title: 'Jane Doe',
      subtitle: 'Product Designer · Bengaluru',
      badge: { text: 'Pro', color: 'positive' },
      children: [
        { type: 'text', text: 'Designing payment experiences at Acme Tech.', color: 'surface.text.gray.subtle' },
        { type: 'divider' },
        { type: 'box', direction: 'row', gap: 'spacing.4', children: [
          { type: 'button', text: 'Message', variant: 'primary' },
          { type: 'button', text: 'View work', variant: 'secondary' },
        ] },
      ],
    },
  },
  {
    label: 'Shopping cart',
    keywords: ['cart', 'shopping cart', 'basket', 'bag'],
    spec: {
      type: 'card',
      title: 'Your cart',
      subtitle: '2 items',
      children: [
        { type: 'box', direction: 'row', justify: 'space-between', children: [
          { type: 'text', text: 'Wireless mouse', color: 'surface.text.gray.subtle' },
          { type: 'text', text: '₹1,299', weight: 'medium' },
        ] },
        { type: 'box', direction: 'row', justify: 'space-between', children: [
          { type: 'text', text: 'USB-C cable', color: 'surface.text.gray.subtle' },
          { type: 'text', text: '₹499', weight: 'medium' },
        ] },
        { type: 'divider' },
        { type: 'box', direction: 'row', justify: 'space-between', align: 'center', children: [
          { type: 'text', text: 'Total', weight: 'semibold' },
          { type: 'amount', value: 1798, currency: 'INR' },
        ] },
        { type: 'button', text: 'Checkout', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Notifications',
    keywords: ['notifications', 'notification', 'alerts', 'inbox'],
    spec: {
      type: 'box',
      direction: 'column',
      gap: 'spacing.4',
      children: [
        { type: 'heading', text: 'Notifications', size: 'large' },
        { type: 'alert', title: 'Payout completed', description: '₹23,900 was settled to your bank account.', color: 'positive' },
        { type: 'alert', title: 'KYC pending', description: 'Verify your documents to keep payouts active.', color: 'notice' },
        { type: 'alert', title: 'New feature', description: 'You can now schedule recurring payouts.', color: 'information' },
      ],
    },
  },
  {
    label: 'Order tracking',
    keywords: ['order tracking', 'track order', 'delivery', 'shipment', 'tracking', 'status'],
    spec: {
      type: 'card',
      title: 'Order #RZP-8842',
      subtitle: 'Arriving tomorrow by 7 PM',
      badge: { text: 'Out for delivery', color: 'information' },
      children: [
        { type: 'text', text: 'Ordered · 24 Jun', color: 'surface.text.gray.subtle' },
        { type: 'text', text: 'Shipped · 25 Jun', color: 'surface.text.gray.subtle' },
        { type: 'text', text: 'Out for delivery · 26 Jun', weight: 'medium' },
        { type: 'divider' },
        { type: 'button', text: 'Track on map', variant: 'secondary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Add payment method',
    keywords: ['add card', 'payment method', 'add bank', 'bank account', 'card details', 'add money', 'wallet topup'],
    spec: {
      type: 'card',
      title: 'Add a card',
      subtitle: 'Your details are encrypted and secure',
      children: [
        { type: 'input', label: 'Card number', placeholder: '1234 5678 9012 3456', inputType: 'number' },
        { type: 'box', direction: 'row', gap: 'spacing.4', children: [
          { type: 'input', label: 'Expiry', placeholder: 'MM/YY' },
          { type: 'password', label: 'CVV', placeholder: '•••' },
        ] },
        { type: 'input', label: 'Name on card', placeholder: 'Jane Doe' },
        { type: 'button', text: 'Add card', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Payout / withdraw',
    keywords: ['payout', 'withdraw', 'transfer money', 'send money', 'cash out'],
    spec: {
      type: 'card',
      title: 'Withdraw funds',
      subtitle: 'Available balance ₹84,200',
      children: [
        { type: 'input', label: 'Amount', placeholder: '5000', inputType: 'number' },
        { type: 'select', label: 'To account', placeholder: 'Select account', options: ['HDFC ••4321', 'ICICI ••8890', 'Add new account'] },
        { type: 'alert', description: 'Withdrawals are processed within 2 hours on business days.', color: 'information' },
        { type: 'button', text: 'Withdraw', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Wallet / balance',
    keywords: ['wallet', 'balance', 'funds', 'account balance'],
    spec: {
      type: 'card',
      title: 'Wallet',
      children: [
        { type: 'text', text: 'Available balance', color: 'surface.text.gray.subtle' },
        { type: 'amount', value: 84200, currency: 'INR' },
        { type: 'divider' },
        { type: 'box', direction: 'row', gap: 'spacing.4', children: [
          { type: 'button', text: 'Add money', variant: 'primary' },
          { type: 'button', text: 'Withdraw', variant: 'secondary' },
        ] },
      ],
    },
  },
  {
    label: 'Onboarding welcome',
    keywords: ['onboarding', 'welcome', 'get started', 'setup', 'first time'],
    spec: {
      type: 'card',
      children: [
        { type: 'box', direction: 'column', gap: 'spacing.4', align: 'center', children: [
          { type: 'badge', text: 'Step 1 of 3', color: 'information', emphasis: 'subtle' },
          { type: 'display', text: 'Welcome to Razorpay', size: 'small' },
          { type: 'text', text: 'Let’s set up your account so you can start accepting payments.', color: 'surface.text.gray.subtle' },
          { type: 'button', text: 'Get started', variant: 'primary', isFullWidth: true },
          { type: 'button', text: 'Skip for now', variant: 'tertiary' },
        ] },
      ],
    },
  },
  {
    label: 'Delete confirmation',
    keywords: ['delete', 'confirm', 'are you sure', 'remove', 'discard'],
    spec: {
      type: 'card',
      title: 'Delete this item?',
      children: [
        { type: 'alert', description: 'This action cannot be undone. The item will be permanently removed.', color: 'negative' },
        { type: 'box', direction: 'row', gap: 'spacing.4', children: [
          { type: 'button', text: 'Cancel', variant: 'secondary', isFullWidth: true },
          { type: 'button', text: 'Delete', variant: 'primary', isFullWidth: true },
        ] },
      ],
    },
  },
  {
    label: 'Empty state',
    keywords: ['empty', 'no data', 'nothing here', 'empty state'],
    spec: {
      type: 'card',
      children: [
        { type: 'box', direction: 'column', gap: 'spacing.4', align: 'center', children: [
          { type: 'badge', text: 'Nothing yet', color: 'neutral', emphasis: 'subtle' },
          { type: 'heading', text: 'No transactions yet', size: 'medium' },
          { type: 'text', text: 'When you receive a payment, it will show up here.', color: 'surface.text.gray.subtle' },
          { type: 'button', text: 'Create a payment link', variant: 'primary' },
        ] },
      ],
    },
  },
  {
    label: 'Error / 404',
    keywords: ['error', '404', 'not found', 'something went wrong', 'broken'],
    spec: {
      type: 'card',
      children: [
        { type: 'box', direction: 'column', gap: 'spacing.4', align: 'center', children: [
          { type: 'display', text: '404', size: 'medium' },
          { type: 'heading', text: 'Page not found', size: 'medium' },
          { type: 'text', text: 'The page you’re looking for doesn’t exist or was moved.', color: 'surface.text.gray.subtle' },
          { type: 'button', text: 'Go home', variant: 'primary' },
        ] },
      ],
    },
  },
  {
    label: 'Feedback rating',
    keywords: ['rating', 'rate', 'review', 'survey', 'nps', 'how was'],
    spec: {
      type: 'card',
      title: 'How was your experience?',
      subtitle: 'Your feedback helps us improve',
      children: [
        { type: 'select', label: 'Rating', placeholder: 'Choose a rating', options: ['⭐️ 1', '⭐️ 2', '⭐️ 3', '⭐️ 4', '⭐️ 5'] },
        { type: 'textarea', label: 'Tell us more', placeholder: 'What went well? What could be better?' },
        { type: 'button', text: 'Submit feedback', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Invite team members',
    keywords: ['invite', 'team', 'members', 'collaborator', 'add user', 'workspace'],
    spec: {
      type: 'card',
      title: 'Invite your team',
      subtitle: 'Add people to your Razorpay workspace',
      children: [
        { type: 'input', label: 'Email address', placeholder: 'teammate@company.com', inputType: 'email' },
        { type: 'select', label: 'Role', placeholder: 'Select a role', options: ['Admin', 'Manager', 'Viewer'] },
        { type: 'checkbox', label: 'Send a welcome email' },
        { type: 'button', text: 'Send invite', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Shipping address',
    keywords: ['address', 'shipping', 'delivery address', 'location form'],
    spec: {
      type: 'card',
      title: 'Shipping address',
      children: [
        { type: 'input', label: 'Full name', placeholder: 'Jane Doe' },
        { type: 'input', label: 'Address line', placeholder: 'Flat / House no, Street' },
        { type: 'box', direction: 'row', gap: 'spacing.4', children: [
          { type: 'input', label: 'City', placeholder: 'Bengaluru' },
          { type: 'input', label: 'PIN code', placeholder: '560001', inputType: 'number' },
        ] },
        { type: 'select', label: 'State', placeholder: 'Select state', options: ['Karnataka', 'Maharashtra', 'Delhi', 'Tamil Nadu'] },
        { type: 'button', text: 'Save address', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Book appointment',
    keywords: ['book', 'appointment', 'schedule', 'reservation', 'slot', 'booking'],
    spec: {
      type: 'card',
      title: 'Book an appointment',
      subtitle: 'Pick a service and time',
      children: [
        { type: 'select', label: 'Service', placeholder: 'Select a service', options: ['Consultation', 'Demo', 'Support call'] },
        { type: 'select', label: 'Time slot', placeholder: 'Choose a slot', options: ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'] },
        { type: 'input', label: 'Your name', placeholder: 'Jane Doe' },
        { type: 'button', text: 'Confirm booking', variant: 'primary', isFullWidth: true },
      ],
    },
  },
  {
    label: 'Newsletter signup',
    keywords: ['newsletter', 'subscribe', 'mailing list', 'updates', 'waitlist'],
    spec: {
      type: 'card',
      children: [
        { type: 'box', direction: 'column', gap: 'spacing.4', align: 'center', children: [
          { type: 'heading', text: 'Stay in the loop', size: 'medium' },
          { type: 'text', text: 'Get product updates and tips, once a month. No spam.', color: 'surface.text.gray.subtle' },
          { type: 'input', label: 'Email', placeholder: 'you@company.com', inputType: 'email' },
          { type: 'button', text: 'Subscribe', variant: 'primary', isFullWidth: true },
        ] },
      ],
    },
  },
  {
    label: 'Apply coupon',
    keywords: ['coupon', 'promo', 'discount', 'offer', 'voucher', 'redeem'],
    spec: {
      type: 'card',
      title: 'Apply a coupon',
      children: [
        { type: 'input', label: 'Coupon code', placeholder: 'SAVE20' },
        { type: 'button', text: 'Apply', variant: 'primary', isFullWidth: true },
        { type: 'alert', description: 'Coupon WELCOME10 applied — you saved ₹200.', color: 'positive' },
      ],
    },
  },
  {
    label: 'Subscription management',
    keywords: ['manage subscription', 'my plan', 'billing', 'renew', 'cancel subscription'],
    spec: {
      type: 'card',
      title: 'Your subscription',
      subtitle: 'Growth plan · renews 1 Jul 2026',
      badge: { text: 'Active', color: 'positive' },
      children: [
        { type: 'box', direction: 'row', justify: 'space-between', align: 'center', children: [
          { type: 'text', text: 'Monthly cost', color: 'surface.text.gray.subtle' },
          { type: 'amount', value: 2999, currency: 'INR' },
        ] },
        { type: 'divider' },
        { type: 'box', direction: 'row', gap: 'spacing.4', children: [
          { type: 'button', text: 'Change plan', variant: 'secondary' },
          { type: 'button', text: 'Cancel', variant: 'tertiary' },
        ] },
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
