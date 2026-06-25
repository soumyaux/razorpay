import { useState } from 'react'
import { Box, Button, BladeProvider } from '@razorpay/blade/components'
import { bladeTheme } from '@razorpay/blade/tokens'
import { EventPage } from './event/EventPage'
import { Studio } from './freestyle/Studio'
import { useGyroPermission } from './event/useGyroPermission'

type Level = 'level1' | 'level2'

function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')
  const [level, setLevel] = useState<Level>('level1')

  // Ask for motion-sensor permission on the first tap after every page load.
  useGyroPermission()

  const toggleScheme = () =>
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <BladeProvider key={colorScheme} themeTokens={bladeTheme} colorScheme={colorScheme}>
      <Box
        backgroundColor="surface.background.gray.subtle"
        minHeight="100vh"
        width="100%"
        paddingBottom="spacing.11"
      >
        {level === 'level1' ? (
          <EventPage colorScheme={colorScheme} onToggleColorScheme={toggleScheme} />
        ) : (
          <Studio />
        )}

        {/* Floating bottom-center challenge switcher (track is click-through). */}
        <Box
          position="fixed"
          bottom="spacing.5"
          left="spacing.0"
          right="spacing.0"
          zIndex={100}
          display="flex"
          justifyContent="center"
          paddingX="spacing.4"
          pointerEvents="none"
        >
          <Box
            display="flex"
            gap="spacing.2"
            padding="spacing.2"
            backgroundColor="surface.background.gray.intense"
            borderRadius="large"
            borderWidth="thin"
            borderColor="surface.border.gray.muted"
            elevation="highRaised"
            pointerEvents="auto"
          >
            <Button
              size="small"
              variant={level === 'level1' ? 'primary' : 'tertiary'}
              onClick={() => setLevel('level1')}
            >
              Level 1 · Image → Blade
            </Button>
            <Button
              size="small"
              variant={level === 'level2' ? 'primary' : 'tertiary'}
              onClick={() => setLevel('level2')}
            >
              Level 2 · Freestyle
            </Button>
          </Box>
        </Box>
      </Box>
    </BladeProvider>
  )
}

export default App
