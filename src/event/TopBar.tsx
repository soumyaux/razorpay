import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Text,
  BellIcon,
  CalendarIcon,
  CompassIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
  TicketIcon,
} from '@razorpay/blade/components'
import { useState, useEffect } from 'react'
import lumaLogo from '../assets/luma-logo.png'
import soumya from '../assets/soumya.avif'

type TopBarProps = {
  colorScheme: 'light' | 'dark'
  onToggleColorScheme: () => void
}

export function TopBar({ colorScheme, onToggleColorScheme }: TopBarProps) {
  const isLight = colorScheme === 'light'
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timeDisplay = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  })

  return (
    <Box
      as="header"
      width="100%"
      paddingY="spacing.4"
      paddingX={{ base: 'spacing.5', l: 'spacing.7' }}
    >
      <Box
        maxWidth="1180px"
        marginX="auto"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="spacing.5"
      >
        {/* Brand + primary nav */}
        <Box display="flex" alignItems="center" gap="spacing.7">
          <Box width="spacing.7" height="spacing.7" borderRadius="medium" overflow="hidden">
            <img
              src={lumaLogo}
              alt="Luma"
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
            />
          </Box>
          <Box display={{ base: 'none', m: 'flex' }} alignItems="center" gap="spacing.6">
            <Link href="#" color="neutral" icon={TicketIcon} iconPosition="left">
              Events
            </Link>
            <Link href="#" color="neutral" icon={CalendarIcon} iconPosition="left">
              Calendars
            </Link>
            <Link href="#" color="neutral" icon={CompassIcon} iconPosition="left">
              Discover
            </Link>
          </Box>
        </Box>

        {/* Actions */}
        <Box display="flex" alignItems="center" gap="spacing.4">
          <Box display={{ base: 'none', m: 'block' }}>
            <Text size="small" color="surface.text.gray.muted">
              {timeDisplay} IST
            </Text>
          </Box>
          <Button variant="tertiary" size="small">
            Create Event
          </Button>
          <IconButton
            icon={SearchIcon}
            size="medium"
            emphasis="intense"
            accessibilityLabel="Search"
            onClick={() => {}}
          />
          <IconButton
            icon={BellIcon}
            size="medium"
            emphasis="intense"
            accessibilityLabel="Notifications"
            onClick={() => {}}
          />
          <IconButton
            icon={isLight ? MoonIcon : SunIcon}
            size="medium"
            emphasis="intense"
            accessibilityLabel={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
            onClick={onToggleColorScheme}
          />
          <Avatar size="small" name="Soumya Ranjan" src={soumya} />
        </Box>
      </Box>
    </Box>
  )
}
