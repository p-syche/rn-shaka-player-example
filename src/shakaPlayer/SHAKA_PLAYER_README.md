# Shaka Player React Native Implementation

This is a native video player implementation for React Native using:
- **iOS**: AVPlayer
- **Android**: ExoPlayer (Media3)

## Architecture

### Native Modules

#### iOS (Swift)
- `ShakaPlayerModule.swift` - Native module for player control methods
- `ShakaPlayerViewManager.swift` - View manager for the player view
- `ShakaPlayerModule.m` - Objective-C bridge header

#### Android (Kotlin)
- `ShakaPlayerModule.kt` - Native module for player control methods
- `ShakaPlayerView.kt` - Custom view component with ExoPlayer
- `ShakaPlayerViewManager.kt` - View manager for the player view
- `ShakaPlayerPackage.kt` - Package registration

### JavaScript/TypeScript

- `NativeShakaPlayer.ts` - TurboModule specification
- `ShakaPlayerNativeView.tsx` - Native view component wrapper
- `useShakaPlayer.ts` - React hook for player state management
- `ShakaPlayer.tsx` - Main React component
- `index.ts` - Public exports

## Features

✅ **Playback Controls**
- Play/Pause
- Seek (forward/backward)
- Volume control
- Auto-hiding controls (6-second timeout)
- Touch-to-show controls

✅ **Events**
- onReady - Fired when video is ready to play
- onPlay - Playback started
- onPause - Playback paused
- onBuffer - Buffering state changes
- onError - Error occurred
- onProgress - Playback progress updates (250ms intervals)
- onEnd - Video playback completed

✅ **State Management**
- Current playback position
- Total duration
- Playing/paused state
- Buffering state
- Error handling

✅ **UI/UX Features**
- TV-optimized layout with overlay controls
- Auto-hiding controls after 6 seconds of playback
- Touch anywhere on video to show controls
- Full-screen video display
- Custom React Native controls (not native player controls)

## Supported Video Formats

### iOS (AVPlayer)
- MP4 (H.264/AAC)
- HLS (.m3u8)
- QuickTime (.mov)

### Android (ExoPlayer)
- MP4 (H.264/AAC)
- HLS (.m3u8)
- DASH (.mpd)
- WebM
- And many more via Media3


# Native vs Custom Controls

This project supports **both** native platform controls and custom React Native controls for the video player.

## Two Implementations Available

### 1. **ShakaPlayerScreen** - Custom React Native Controls ✨
**File**: `src/ShakaPlayerScreen.tsx`

**Features**:
- ✅ Custom UI built entirely in React Native
- ✅ Auto-hiding controls (6-second timeout)
- ✅ Touch-to-show controls
- ✅ TV-optimized overlay layout
- ✅ Consistent cross-platform experience
- ✅ Full customization control
- ✅ Large touch targets for TV
- ✅ Progress bar with time display
- ✅ Seek ±10s buttons

### 2. **ShakaPlayerNativeVideoScreen** - Native Platform Controls 🎯
**File**: `src/ShakaPlayerNativeVideoScreen.tsx`

**Features**:
- ✅ Android: ExoPlayer's built-in controller
- ⚠️ iOS: Basic playback (AVPlayerLayer has no built-in controls)
- ✅ Minimal code (just the player component)
- ✅ Platform-native gestures and behaviors
- ✅ Accessibility built-in (on Android)

## Implementation Details

### How to Toggle Between Modes

The `ShakaPlayer` component accepts a `showNativeControls` prop:

```tsx
// Custom Controls (default)
<ShakaPlayer
  source={{ uri: videoUrl }}
  showNativeControls={false} // or omit (defaults to false)
/>

// Native Controls
<ShakaPlayer
  source={{ uri: videoUrl }}
  showNativeControls={true}
/>
```

### Android Implementation

**Native Controls** (`showNativeControls={true}`):
```kotlin
// In ShakaPlayerView.kt
playerView.useController = true  // Shows ExoPlayer's built-in controls
```

**Custom Controls** (`showNativeControls={false}`):
```kotlin
playerView.useController = false  // Hides ExoPlayer's controls
```

### iOS Implementation

**Native Controls** (`showNativeControls={true}`):
- Currently uses `AVPlayerLayer` which doesn't have built-in controls
- For true iOS native controls, would require refactoring to use `AVPlayerViewController`
- Logged as a note in the code

**Custom Controls** (`showNativeControls={false}`):
- Uses `AVPlayerLayer` with custom React Native UI overlay
