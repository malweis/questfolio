# Sound Consent System

This document describes the sound consent system implemented for the FFXIV page, which handles user consent for audio playback and provides controls for toggling sound on/off.

## Overview

The sound consent system is designed to:
- **Only appear on the FFXIV page** where sound is actually used
- **Prompt for consent every time** the user visits the page (no localStorage persistence)
- **Provide immediate sound control** through a floating toggle button
- **Handle browser autoplay policies** by requiring user interaction before playing audio

## Components

### `SoundProvider`
- **Location**: `components/sound-context.tsx`
- **Purpose**: Provides the sound consent context to child components
- **State**: Manages `hasSoundConsent` boolean value

### `SoundConsentOverlay`
- **Location**: `components/sound-consent-overlay.tsx`
- **Purpose**: Modal overlay that prompts user for sound consent
- **Features**: 
  - Single "Continue" button (implies sound is enabled)
  - No localStorage persistence
  - Appears every time the FFXIV page loads

### `FloatingSoundToggle`
- **Location**: `components/floating-sound-toggle.tsx`
- **Purpose**: Persistent button to toggle sound on/off during the session
- **Position**: Fixed position on screen edges
- **Visual**: Different icons for sound on/off states

### `useSound` Hook
- **Location**: `components/sound-context.tsx`
- **Purpose**: Hook to access sound consent state and setter
- **Usage**: `const { hasSoundConsent, setSoundConsent } = useSound()`

## Implementation

### FFXIV Page Integration
The sound system is integrated directly into the FFXIV page:

```tsx
// app/ffxiv/page.tsx
export default function FFXIVPage() {
  return (
    <SoundProvider>
      <FFXIVPageContent />
    </SoundProvider>
  );
}
```

### Sound Consent Flow
1. **Page Load**: `showConsent` state is set to `true`
2. **Overlay Display**: `SoundConsentOverlay` appears immediately
3. **User Action**: User clicks "Continue" button
4. **Consent Granted**: `setSoundConsent(true)` is called
5. **Overlay Hidden**: `showConsent` is set to `false`
6. **Sound Enabled**: Audio components can now play sounds

### Audio Component Integration
Components that need sound check the consent state:

```tsx
// components/scroll-image.tsx
const { hasSoundConsent } = useSound()

useEffect(() => {
  if (soundSrc && hasSoundConsent) {
    // Only preload audio if user has consented
    const audio = new Audio(soundSrc)
    // ... audio setup
  }
}, [soundSrc, hasSoundConsent])
```

## Key Features

### No Persistence
- Consent is **not stored** in localStorage
- Users must consent **every time** they visit the FFXIV page
- This ensures the user interaction happens in the right context for sound initialization

### Context-Aware
- Sound consent only appears on pages that actually use sound
- Other pages (like the home page) don't show the consent overlay
- This prevents unnecessary user interaction on silent pages

### Immediate Control
- Floating toggle button allows users to change sound preference during their session
- No need to reload the page to change sound settings
- Visual feedback shows current sound state

## Browser Compatibility

### Autoplay Policies
- Modern browsers block audio autoplay without user interaction
- The consent overlay provides the required user interaction
- Audio components gracefully handle autoplay failures

### Fallback Behavior
- If sound fails to play, components continue silently
- No errors are thrown to the user
- Console logs indicate when autoplay is blocked

## Usage Examples

### Adding Sound to New Components
```tsx
import { useSound } from "../components/sound-context"

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

### Conditional Sound Rendering
```tsx
function AudioComponent() {
  const { hasSoundConsent } = useSound()
  
  if (!hasSoundConsent) {
    return <div>Sound not available</div>
  }
  
  return <audio src="/sounds/audio.mp3" controls />
}
```

## Benefits

1. **User Experience**: Clear consent process without unnecessary prompts
2. **Performance**: Sound only loads when needed and consented
3. **Compliance**: Follows browser autoplay policies
4. **Flexibility**: Users can change preferences during their session
5. **Context**: Consent only appears where sound is actually used
