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
import { useMotionPermission } from './useGyroPermission'

/** Custom brand icon — Blade Button accepts a component in its `icon` slot. */
function WhatsAppLogo() {
  return (
    <Box width="spacing.6" height="spacing.6">
      <img src={whatsapp} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
    </Box>
  )
}

const SHARE_URL = typeof window !== 'undefined' ? window.location.href : 'https://lu.ma/ai-x-design'
const EVENT_DATE_SHORT = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'long' })
const EVENT_DATE_LONG = new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })
const SHARE_TEXT = `Join me at AI x Design Meetup @Razorpay on ${EVENT_DATE_SHORT}!`

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
  const { status: motionStatus, request: requestMotion } = useMotionPermission()

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
      {/* Event banner with 3D tilt movement. Show the FULL banner (its natural
          aspect ratio) on every screen — forcing a tall mobile crop cut off the
          title text on the sides. */}
      <TiltCard maxTilt={10}>
        <Box borderRadius="large" overflow="hidden" width="100%" elevation="highRaised">
          <img
            src={banner}
            alt="AI x Design Meetup"
            // Reserve the square (400×400) space up front via aspectRatio so the
            // height exists before the file loads. Without this the sheet
            // measured a too-short height on a cached refresh → opened half.
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </Box>
      </TiltCard>

      <Box display="flex" flexDirection="column" gap="spacing.1">
        <Heading size="small">AI x Design Meetup @Razorpay</Heading>
        <Text size="small" color="surface.text.gray.muted">
          {EVENT_DATE_LONG} · Razorpay Arena Office, Koramangala
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

      {/* iOS gates the gyroscope behind a one-time, gesture-driven prompt.
          A real button tap is the most reliable way to trigger it — and the
          only recovery path once iOS has cached a decision. */}
      {motionStatus === 'idle' ? (
        <Button variant="tertiary" size="small" isFullWidth onClick={requestMotion}>
          Tilt the banner with motion
        </Button>
      ) : null}
      {motionStatus === 'denied' ? (
        <Alert
          color="information"
          title="Motion access is off"
          description="To tilt the banner by moving your phone, enable Settings → Safari → Motion & Orientation Access, then reopen this sheet."
          isDismissible={false}
        />
      ) : null}

      {/* Share actions. On mobile, add bottom clearance so the floating
          Level 1/2 switcher (fixed to the screen bottom) never covers the
          Copy / WhatsApp buttons. Desktop has no floating bar, so no gap. */}
      <Box
        display="flex"
        gap="spacing.3"
        marginBottom={{ base: 'spacing.10', m: 'spacing.0' }}
      >
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
  // Sheet opens at the FIRST snap point — keep it high so it opens nearly full
  // on load (no drag needed; dragging is awkward on iOS). Lower snaps remain
  // available if the user wants to shrink it.
  if (isMobile) {
    return (
      <BottomSheet isOpen={isOpen} onDismiss={onDismiss} snapPoints={[0.94, 0.96, 0.98]}>
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
