import { useState } from 'react'
import { Box, Text, Button, BladeProvider } from '@razorpay/blade/components'
import { bladeTheme } from '@razorpay/blade/tokens'
import { EventPage } from './event/EventPage'
import { Studio } from './freestyle/Studio'

type Level = 'level1' | 'level2'

function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')
  const [level, setLevel] = useState<Level>('level1')

  const toggleScheme = () =>
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'))

  return (
    <BladeProvider key={colorScheme} themeTokens={bladeTheme} colorScheme={colorScheme}>
      <Box backgroundColor="surface.background.gray.subtle" minHeight="100vh" width="100%">
        {/* Challenge switcher bar */}
        <Box
          as="header"
          position="sticky"
          top="spacing.0"
          zIndex={100}
          width="100%"
          backgroundColor="surface.background.gray.intense"
          borderBottomWidth="thin"
          borderBottomColor="surface.border.gray.muted"
          paddingX={{ base: 'spacing.4', m: 'spacing.7' }}
          paddingY="spacing.3"
        >
          <Box
            display="flex"
            flexDirection={{ base: 'column', m: 'row' }}
            alignItems={{ base: 'stretch', m: 'center' }}
            justifyContent="space-between"
            gap="spacing.3"
            maxWidth="1180px"
            marginX="auto"
            width="100%"
          >
            <Text size="medium" weight="semibold">
              Blade Challenge
            </Text>

            <Box
              display="flex"
              alignItems="center"
              gap="spacing.3"
              justifyContent={{ base: 'space-between', m: 'flex-end' }}
            >
              {/* Segmented Level toggle */}
              <Box
                display="flex"
                gap="spacing.2"
                padding="spacing.2"
                backgroundColor="surface.background.gray.moderate"
                borderRadius="large"
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

              <Button size="small" variant="secondary" onClick={toggleScheme}>
                {colorScheme === 'light' ? 'Dark' : 'Light'}
              </Button>
            </Box>
          </Box>
        </Box>

        {level === 'level1' ? (
          <EventPage colorScheme={colorScheme} onToggleColorScheme={toggleScheme} />
        ) : (
          <Studio />
        )}
      </Box>
    </BladeProvider>
  )
}

export default App
