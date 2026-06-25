import { Box } from '@razorpay/blade/components'
import { TopBar } from './TopBar'
import { EventSidebar } from './EventSidebar'
import { EventDetails } from './EventDetails'
import { SiteFooter } from './SiteFooter'
import background from '../assets/background.png'

type EventPageProps = {
  colorScheme: 'light' | 'dark'
  onToggleColorScheme: () => void
}

export function EventPage({ colorScheme, onToggleColorScheme }: EventPageProps) {
  return (
    <Box
      backgroundColor="surface.background.gray.subtle"
      minHeight="100vh"
      width="100%"
      position="relative"
    >
      {/* Decorative page backdrop — light mode only. Hidden in dark mode so the
          dark surface token shows through cleanly. Box can't render an image
          background, so this is a plain non-interactive layer behind content. */}
      {colorScheme === 'light' ? (
        <div
          aria-hidden
          style={{
            position: 'fixed',
            inset: 0,
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ) : null}
      <Box width="100%" position="relative" zIndex={1}>
        <TopBar colorScheme={colorScheme} onToggleColorScheme={onToggleColorScheme} />

        <Box
          as="main"
          maxWidth="1180px"
          marginX="auto"
          width="100%"
          paddingX={{ base: 'spacing.5', l: 'spacing.7' }}
          paddingTop="spacing.5"
          paddingBottom="spacing.8"
        >
          <Box
            display="flex"
            flexDirection={{ base: 'column', l: 'row' }}
            gap="spacing.8"
            alignItems="flex-start"
          >
            {/* Left info column — sticky on desktop */}
            <Box
              width={{ base: '100%', l: '360px' }}
              flexShrink={0}
              position={{ base: 'static', l: 'sticky' }}
              top="spacing.7"
            >
              <EventSidebar />
            </Box>

            {/* Right main column */}
            <Box flex="1" width="100%" minWidth="spacing.0">
              <EventDetails />
            </Box>
          </Box>
        </Box>

        <SiteFooter />
      </Box>
    </Box>
  )
}
