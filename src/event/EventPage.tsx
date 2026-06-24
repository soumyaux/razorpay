import { Box } from '@razorpay/blade/components'
import { TopBar } from './TopBar'
import { EventSidebar } from './EventSidebar'
import { EventDetails } from './EventDetails'
import { SiteFooter } from './SiteFooter'

type EventPageProps = {
  colorScheme: 'light' | 'dark'
  onToggleColorScheme: () => void
}

export function EventPage({ colorScheme, onToggleColorScheme }: EventPageProps) {
  return (
    <Box backgroundColor="surface.background.gray.subtle" minHeight="100vh" width="100%">
      <Box width="100%">
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
