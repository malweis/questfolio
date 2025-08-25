# Sound Consent System

A complete solution for handling browser autoplay policies and providing users with control over sound effects.

## How It Works

1. **Initial Load**: When the page loads, a consent overlay appears asking users about sound preferences
2. **User Choice**: Users click "Continue" to enable sound and proceed
3. **Sound Context**: All sound-enabled components check the consent state before playing audio
4. **Floating Toggle**: Users can toggle sound on/off anytime with a floating button

## Components

### `SoundEnabledApp`
- Wraps the entire application
- Provides sound context to all child components
- Shows consent overlay when needed

### `SoundConsentOverlay`
- Beautiful modal asking for sound consent
- Includes sound preview buttons (thunder and sword effects)
- Single "Continue" button to enable sound and proceed

### `SoundContext`
- Manages sound consent state across the app
- Provides `hasSoundConsent` boolean to all components
- No persistence - prompts every time for fresh choice

## Usage

### In Components
```tsx
import { useSound } from "./sound-context"

function MyComponent() {
  const { hasSoundConsent } = useSound()
  
  const playSound = () => {
    if (hasSoundConsent) {
      const audio = new Audio('/sounds/my-sound.mp3')
      audio.play().catch(() => {})
    }
  }
  
  return <button onClick={playSound}>Play Sound</button>
}
```

### In Layout
```tsx
// app/layout.tsx
import SoundEnabledApp from "../components/sound-enabled-app"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SoundEnabledApp>
          {children}
        </SoundEnabledApp>
      </body>
    </html>
  )
}
```

## Benefits

- **No Autoplay Errors**: Solves browser autoplay policy issues
- **User Control**: Users can toggle sound anytime with floating button
- **Better UX**: Clear communication about sound features
- **Performance**: Audio only loads when consented
- **Accessibility**: Respects user preferences
- **Fresh Choice**: Users make sound choice every visit

## Sound Files

Place your sound files in `public/sounds/`:
- `/sounds/thunder.mp3` - Thunder sound effect
- `/sounds/sword-slash.mp3` - Sword slash sound
- Any other audio files you want to use

## Browser Compatibility

- Works with all modern browsers
- Gracefully handles autoplay restrictions
- Prompts for sound consent every visit
- No AudioContext warnings
