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

## Usage

```tsx
import { ShakaPlayer } from './shakaPlayer';

function VideoScreen() {
  const playerRef = useRef<ShakaPlayerControls>(null);
  const [paused, setPaused] = useState(false);

  return (
    <ShakaPlayer
      ref={playerRef}
      source={{ uri: 'http://example.com/video.mp4' }}
      style={{ width: '100%', height: 300 }}
      paused={paused}
      volume={1.0}
      onReady={() => console.log('Ready')}
      onPlay={() => console.log('Playing')}
      onPause={() => console.log('Paused')}
      onBuffer={(isBuffering) => console.log('Buffering:', isBuffering)}
      onError={(error) => console.error('Error:', error)}
      onProgress={({ currentTime, duration }) => {
        console.log(`${currentTime}s / ${duration}s`);
      }}
      onEnd={() => console.log('Ended')}
    />
  );
}
```

## Player Controls API

```typescript
interface ShakaPlayerControls {
  play: () => void;
  pause: () => void;
  seekTo: (position: number) => void;
  setVolume: (volume: number) => void;
  getCurrentPosition: () => Promise<number>;
  getDuration: () => Promise<number>;
  getIsPlaying: () => Promise<boolean>;
  loadVideo: (url: string) => void;
}
```

## Build Instructions

### iOS

1. Navigate to the iOS directory:
   ```bash
   cd ios
   ```

2. Install CocoaPods dependencies:
   ```bash
   pod install
   ```

3. Open the workspace in Xcode:
   ```bash
   open RNVideoExample.xcworkspace
   ```

4. Ensure the Swift bridging header is configured in Build Settings:
   - Objective-C Bridging Header: `RNVideoExample/ShakaPlayer-Bridging-Header.h`

5. Build and run from Xcode or:
   ```bash
   npm run ios
   ```

### Android

1. The ExoPlayer dependencies are already added to `android/app/build.gradle`:
   ```gradle
   implementation("androidx.media3:media3-exoplayer:1.2.0")
   implementation("androidx.media3:media3-ui:1.2.0")
   implementation("androidx.media3:media3-exoplayer-dash:1.2.0")
   implementation("androidx.media3:media3-exoplayer-hls:1.2.0")
   ```

2. Build and run:
   ```bash
   npm run android
   ```

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

## Dependencies

### Android
- `androidx.media3:media3-exoplayer:1.2.0`
- `androidx.media3:media3-ui:1.2.0`
- `androidx.media3:media3-exoplayer-dash:1.2.0`
- `androidx.media3:media3-exoplayer-hls:1.2.0`

### iOS
- AVFoundation (built-in)
- AVKit (built-in)

## Known Limitations

1. **iOS Bridging Header**: Make sure to configure the Swift bridging header in Xcode project settings
2. **Android Permissions**: Internet permission is required in AndroidManifest.xml (should already be present)
3. **HTTPS**: On iOS, App Transport Security may require HTTPS URLs or specific exceptions

## Testing

The implementation includes a test screen at `src/ShakaPlayerScreen.tsx` with:
- Full playback controls (play/pause, seek)
- Progress bar
- Buffering indicator
- Error display
- Sample video: Tears of Steel

## Future Enhancements

Potential improvements:
- [ ] Picture-in-Picture support
- [ ] Playback speed control
- [ ] Subtitle/caption support
- [ ] Quality selection for adaptive streaming
- [ ] Casting support (Chromecast/AirPlay)
- [ ] DRM support
- [ ] Offline playback
