import { useState } from 'react'
import { BladeProvider } from '@razorpay/blade/components'
import { bladeTheme } from '@razorpay/blade/tokens'
import { EventPage } from './event/EventPage'

function App() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light')

  return (
    <BladeProvider key={colorScheme} themeTokens={bladeTheme} colorScheme={colorScheme}>
      <EventPage
        colorScheme={colorScheme}
        onToggleColorScheme={() =>
          setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        }
      />
    </BladeProvider>
  )
}

export default App
