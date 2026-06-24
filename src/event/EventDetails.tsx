import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Display,
  Divider,
  Heading,
  Link,
  StepGroup,
  StepItem,
  StepItemIndicator,
  Text,
  ArrowUpRightIcon,
  CalendarIcon,
  MapPinIcon,
  ShareIcon,
  TicketIcon,
} from '@razorpay/blade/components'
import { useState } from 'react'
import soumya from '../assets/soumya.avif'
import appleWallet from '../assets/Apple_Wallet_Icon.svg'
import { ShareModal } from './ShareModal'

const schedule = [
  { time: '7:30 PM', text: 'Doors open, Registration & networking' },
  { time: '8:00 PM', text: 'Short Kickoff, AI at Razorpay Design' },
  { time: '8:30 PM', text: 'Networking resumes, dinner open' },
  { time: '9:30 PM', text: 'Figma Config 2026 livestream' },
  { time: '11:00 PM', text: 'Wrap' },
]

function AppleWalletIcon() {
  return (
    <Box width="spacing.6" height="spacing.6">
      <img src={appleWallet} alt="" style={{ width: '100%', height: '100%', display: 'block' }} />
    </Box>
  )
}

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.539614690136!2d77.60737127657983!3d12.937284687374934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15716159ad17%3A0x822cd424898295d9!2sRazorpay%20(Arena%20Office)!5e0!3m2!1sen!2sin!4v1782320814012!5m2!1sen!2sin'

function CalendarChip() {
  const eventDate = new Date(2026, 5, 24) // June 24, 2026
  const today = new Date()
  const isToday = today.getDate() === eventDate.getDate() &&
                  today.getMonth() === eventDate.getMonth() &&
                  today.getFullYear() === eventDate.getFullYear()

  return (
    <Box
      width="spacing.10"
      flexShrink={0}
      borderRadius="medium"
      overflow="hidden"
      borderWidth="thin"
      borderColor="surface.border.gray.normal"
      backgroundColor="surface.background.gray.intense"
    >
      <Box backgroundColor="surface.background.primary.intense" paddingY="spacing.1">
        <Text size="xsmall" weight="semibold" textAlign="center" color="surface.text.staticWhite.normal">
          {isToday ? 'TODAY' : 'JUN'}
        </Text>
      </Box>
      <Box paddingY="spacing.2">
        <Heading size="small" textAlign="center">
          {isToday ? '🕐' : '24'}
        </Heading>
      </Box>
    </Box>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <Box display="flex" flexDirection="column" gap="spacing.3">
      <Text size="small" color="surface.text.gray.muted">
        {children}
      </Text>
      <Divider />
    </Box>
  )
}

export function EventDetails() {
  const [isShareOpen, setIsShareOpen] = useState(false)

  const eventDate = new Date(2026, 5, 24) // June 24, 2026
  const today = new Date()
  const isToday = today.getDate() === eventDate.getDate() &&
                  today.getMonth() === eventDate.getMonth() &&
                  today.getFullYear() === eventDate.getFullYear()

  const dateDisplay = isToday ? 'Today' : 'Wednesday, 24 June'

  const addToCalendar = () => {
    const eventStart = new Date(2026, 5, 24, 19, 30) // 7:30 PM
    const eventEnd = new Date(2026, 5, 24, 23, 0) // 11:00 PM

    const startDateTime = eventStart.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const endDateTime = eventEnd.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const title = 'AI x Design Meetup @Razorpay'
    const description = 'Inviting designers and builders at the cutting edge of AI! Join us for an evening of honest conversations, shared stories, food, and a live watch party for Figma Config 2026.'
    const location = 'Razorpay (Arena Office), Bengaluru, Karnataka'

    // Google Calendar URL
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime.replace(/Z$/, '')}/${endDateTime.replace(/Z$/, '')}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&ctz=Asia/Kolkata`

    // ICS file content as fallback
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Razorpay//Event//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Razorpay Events
X-WR-TIMEZONE:Asia/Kolkata
BEGIN:VEVENT
UID:razorpay-ai-design-meetup-2026@razorpay.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDateTime}
DTEND:${endDateTime}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
URL:https://razorpay.com
END:VEVENT
END:VCALENDAR`

    // Try opening Google Calendar first
    window.open(googleCalendarUrl, '_blank')

    // Also provide ICS download as fallback
    setTimeout(() => {
      const blob = new Blob([icsContent], { type: 'text/calendar' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'razorpay-ai-design-meetup.ics'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    }, 500)
  }

  return (
    <Box display="flex" flexDirection="column" gap="spacing.8">
      {/* Title */}
      <Display size="medium" weight="semibold" color="surface.text.gray.normal">
        AI x Design Meetup @Razorpay
      </Display>

      {/* When / Where */}
      <Box display="flex" flexDirection="column" gap="spacing.4">
        <Box display="flex" alignItems="center" gap="spacing.3">
          <CalendarChip />
          <Box display="flex" flexDirection="column">
            <Text weight="semibold" color="surface.text.gray.normal">
              {dateDisplay}
            </Text>
            <Text size="small" color="surface.text.gray.muted">
              7:30 PM - 11:00 PM
            </Text>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap="spacing.3">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="spacing.10"
            height="spacing.10"
            flexShrink={0}
            borderRadius="medium"
            borderWidth="thin"
            borderColor="surface.border.gray.normal"
            backgroundColor="surface.background.gray.intense"
          >
            <MapPinIcon size="large" color="surface.icon.gray.subtle" />
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" alignItems="center" gap="spacing.2">
              <Text weight="semibold" color="surface.text.gray.normal">
                Razorpay (Arena Office)
              </Text>
              <ArrowUpRightIcon size="small" color="surface.icon.gray.muted" />
            </Box>
            <Text size="small" color="surface.text.gray.muted">
              Bengaluru, Karnataka
            </Text>
          </Box>
        </Box>
      </Box>

      {/* Registration card */}
      <Card backgroundColor="surface.background.gray.moderate" padding="spacing.5" width="100%">
        <CardBody>
          <Box display="flex" flexDirection="column" gap="spacing.4">
            <Box display="flex" alignItems="flex-start" justifyContent="space-between">
              <Avatar size="medium" name="Soumya Ranjan" src={soumya} />
              <Badge color="notice" emphasis="subtle">
                LIVE
              </Badge>
            </Box>

            <Heading size="medium">You're In</Heading>

            <Box display="flex" alignItems="center" gap="spacing.3" flexWrap="wrap">
              <Button variant="secondary" size="small" icon={TicketIcon} iconPosition="left">
                My Ticket
              </Button>
              <Button
                variant="secondary"
                size="small"
                icon={AppleWalletIcon}
                accessibilityLabel="Add to Apple Wallet"
                onClick={() => {}}
              />
              <Box flex="1" />
              <Button
                variant="tertiary"
                size="small"
                icon={ShareIcon}
                iconPosition="left"
                onClick={() => setIsShareOpen(true)}
              >
                Invite a Friend
              </Button>
            </Box>

            <Text size="small" color="surface.text.gray.muted">
              No longer able to attend? Notify the host by{' '}
              <Link href="#" size="small">
                cancelling your registration
              </Link>
              .
            </Text>

            <Divider />

            <Box
              display="flex"
              flexDirection={{ base: 'column', m: 'row' }}
              alignItems={{ base: 'stretch', m: 'center' }}
              justifyContent="space-between"
              gap="spacing.3"
            >
              <Box display="flex" flexDirection="column" gap="spacing.1">
                <Text weight="semibold" color="surface.text.gray.normal">
                  Get Ready for the Event
                </Text>
                <Text size="small" color="surface.text.gray.muted">
                  Reminder: SMS & Email
                </Text>
              </Box>
              <Button
                variant="primary"
                size="small"
                icon={CalendarIcon}
                iconPosition="left"
                onClick={addToCalendar}
              >
                Add to Calendar
              </Button>
            </Box>
          </Box>
        </CardBody>
      </Card>

      {/* About */}
      <Box display="flex" flexDirection="column" gap="spacing.4">
        <SectionLabel>About Event</SectionLabel>
        <Heading size="large">Inviting designers and builders at the cutting edge of AI!</Heading>
        <Text color="surface.text.gray.subtle">
          We're bringing together a curated group of Bangalore's most AI-forward designers, design
          engineers and builders for an evening of honest conversations, shared stories, some food,
          and a live watch party for one of the biggest design events of the year, Figma Config 2026.
        </Text>
        <Text color="surface.text.gray.subtle">
          This is not a panel. Just a room full of people who are actually building. Expect
          thoughtful conversations, shared learnings and the opportunity to meet others building at
          the intersection of AI and product design.
        </Text>
        <Box display="flex" flexDirection="column" gap="spacing.0">
          <Text weight="semibold" color="surface.text.gray.normal">
            Seats are limited.
          </Text>
          <Text as="cite" size="medium" color="surface.text.gray.muted">
            (This is an independent community event and is not affiliated with or endorsed by Figma.)
          </Text>
        </Box>
      </Box>

      {/* Schedule */}
      <Box display="flex" flexDirection="column" gap="spacing.5">
        <Heading size="medium">Schedule</Heading>
        <StepGroup orientation="vertical" size="large">
          {schedule.map((item) => (
            <StepItem
              key={item.time}
              title={item.time}
              description={item.text}
              stepProgress="full"
              marker={<StepItemIndicator color="primary" />}
            />
          ))}
        </StepGroup>
      </Box>

      {/* Location */}
      <Box display="flex" flexDirection="column" gap="spacing.4">
        <SectionLabel>Location</SectionLabel>
        <Heading size="medium">Razorpay (Arena Office)</Heading>
        <Text color="surface.text.gray.subtle">
          3rd, 4th, 5th and 6th Floor, Kothari Arena 24, Hosur Rd, Chikku Lakshmaiah Layout,
          Koramangala, Bengaluru, Karnataka 560030, India
        </Text>
        <Text size="small" color="surface.text.gray.muted">
          4th floor, Razorpay Arena Office
        </Text>
        <Box
          position="relative"
          borderRadius="large"
          overflow="hidden"
          width="100%"
          height="300px"
          elevation="lowRaised"
        >
          <iframe
            title="Razorpay Arena Office location"
            src={MAP_SRC}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </Box>
      </Box>

      <ShareModal isOpen={isShareOpen} onDismiss={() => setIsShareOpen(false)} />
    </Box>
  )
}
