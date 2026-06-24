import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalHeader,
  BottomSheet,
  BottomSheetBody,
  BottomSheetHeader,
  Text,
  CopyIcon,
} from '@razorpay/blade/components'
import banner from '../assets/banner.jpg'
import whatsapp from '../assets/whatsapp.svg'
import { TiltCard } from './TiltCard'

/** Custom brand icon — Blade Button accepts a component in its `icon` slot. */
function WhatsAppLogo() {
  return (
    <Box width="spacing.6" height="spacing.6">
      <img src={whatsapp} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
    </Box>
  )
}

const SHARE_URL = typeof window !== 'undefined' ? window.location.href : 'https://lu.ma/ai-x-design'
const SHARE_TEXT = 'Join me at AI x Design Meetup @Razorpay on Wed, 24 June!'

/** Returns true when the viewport is below Blade's `m` breakpoint (mobile). */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false,
  )

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return isMobile
}

type ShareModalProps = {
  isOpen: boolean
  onDismiss: () => void
}

export function ShareModal({ isOpen, onDismiss }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const isMobile = useIsMobile()

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

  const content = (
    <Box display="flex" flexDirection="column" gap="spacing.5">
      {/* Event banner with 3D tilt movement. On mobile it's a tall hero so the
          sheet hugs a naturally-tall content (opens high, no empty gap). */}
      <TiltCard maxTilt={10}>
        <Box borderRadius="large" overflow="hidden" width="100%" elevation="highRaised">
          <img
            src={banner}
            alt="AI x Design Meetup"
            style={{
              width: '100%',
              height: isMobile ? '52vh' : 'auto',
              display: 'block',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </Box>
      </TiltCard>

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
  )

  // Mobile → slide-up BottomSheet. Desktop → centered Modal.
  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onDismiss={onDismiss} snapPoints={[0.9, 0.93, 0.96]}>
        <BottomSheetHeader title="Invite a Friend" subtitle="Share this event with your network" />
        <BottomSheetBody>{content}</BottomSheetBody>
      </BottomSheet>
    )
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} size="small" accessibilityLabel="Invite a friend">
      <ModalHeader title="Invite a Friend" subtitle="Share this event with your network" />
      <ModalBody>{content}</ModalBody>
    </Modal>
  )
}
