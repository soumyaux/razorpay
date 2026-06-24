import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalHeader,
  Text,
  CopyIcon,
} from '@razorpay/blade/components'
import banner from '../assets/banner.jpg'
import whatsapp from '../assets/whatsapp.svg'

/** Custom brand icon — Blade Button accepts a component in its `icon` slot. */
function WhatsAppLogo() {
  return <img src={whatsapp} alt="" style={{ width: '20px', height: '20px', display: 'block' }} />
}

const SHARE_URL = typeof window !== 'undefined' ? window.location.href : 'https://lu.ma/ai-x-design'
const SHARE_TEXT = 'Join me at AI x Design Meetup @Razorpay on Wed, 24 June!'

type ShareModalProps = {
  isOpen: boolean
  onDismiss: () => void
}

export function ShareModal({ isOpen, onDismiss }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SHARE_URL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      setCopied(false)
    }
  }

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${SHARE_TEXT} ${SHARE_URL}`)
    window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} size="small" accessibilityLabel="Invite a friend">
      <ModalHeader title="Invite a Friend" subtitle="Share this event with your network" />
      <ModalBody>
        <Box display="flex" flexDirection="column" gap="spacing.5">
          {/* Event banner */}
          <Box borderRadius="large" overflow="hidden" width="100%" elevation="lowRaised">
            <img
              src={banner}
              alt="AI x Design Meetup"
              style={{ width: '100%', display: 'block' }}
            />
          </Box>

          <Box display="flex" flexDirection="column" gap="spacing.1">
            <Heading size="small">AI x Design Meetup @Razorpay</Heading>
            <Text size="small" color="surface.text.gray.muted">
              Wednesday, 24 June · Razorpay Arena Office, Koramangala
            </Text>
          </Box>

          {copied ? (
            <Alert
              color="positive"
              title="Link copied!"
              description="The event link is on your clipboard."
              isDismissible
              onDismiss={() => setCopied(false)}
            />
          ) : null}

          {/* Share actions */}
          <Box display="flex" gap="spacing.3">
            <Box flex="1">
              <Button
                variant="secondary"
                size="large"
                icon={CopyIcon}
                iconPosition="left"
                isFullWidth
                onClick={handleCopy}
              >
                Copy link
              </Button>
            </Box>
            <Box flex="1">
              <Button
                variant="secondary"
                size="large"
                icon={WhatsAppLogo}
                iconPosition="left"
                isFullWidth
                onClick={handleWhatsApp}
              >
                WhatsApp
              </Button>
            </Box>
          </Box>
        </Box>
      </ModalBody>
    </Modal>
  )
}
