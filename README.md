# React Native Shaka Player Example

A React Native application demonstrating video playback capabilities with multiple video players including support for MP4 and HLS/M3U8 streaming.

## Features

- **Home Screen**: Clean navigation interface with 3 video player options
- **MP4 Video Player**: Plays MP4 video files with custom controls
- **M3U8/HLS Stream Player**: Supports adaptive streaming content
- **Simple Video Player**: Basic video playback functionality
- **Navigation**: Smooth navigation between screens using React Navigation
- **Styling**: Modern UI styled with NativeWind (Tailwind CSS for React Native)

## Tech Stack

- **React Native** (v0.81.4) with TypeScript
- **React Navigation** (v6) for navigation
- **react-native-video** for video playback
- **NativeWind** (v2) for styling with Tailwind CSS
- **Jest** for testing

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- React Native development environment
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:
```bash
git clone https://github.com/p-syche/rn-shaka-player-example.git
cd rn-shaka-player-example
```

2. Install dependencies:
```bash
npm install
```

3. Install iOS dependencies (iOS only):
```bash
cd ios && pod install && cd ..
```

### Running the App

For iOS:
```bash
npm run ios
```

For Android:
```bash
npm run android
```

Start the Metro bundler:
```bash
npm start
```

## Project Structure

```
src/
├── navigation/
│   ├── AppNavigator.tsx    # Main navigation configuration
│   └── types.ts           # Navigation type definitions
└── screens/
    ├── HomeScreen.tsx          # Main home screen with navigation buttons
    ├── VideoPlayer1Screen.tsx  # MP4 video player
    ├── VideoPlayer2Screen.tsx  # HLS/M3U8 stream player
    └── VideoPlayer3Screen.tsx  # Simple video player
```

## Video Sources

The app uses sample video content:

- **MP4 Player**: Big Buck Bunny (Google Cloud Storage)
- **HLS Player**: Apple Test Stream with adaptive bitrates
- **Simple Player**: Elephants Dream (Google Cloud Storage)

## Development

### Available Scripts

- `npm start` - Start Metro bundler
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npx tsc --noEmit` - Type check without emitting files

### Styling

The app uses NativeWind for styling, which allows you to use Tailwind CSS classes directly in React Native components. The configuration is set up in:

- `tailwind.config.js` - Tailwind configuration
- `babel.config.js` - Babel plugin configuration
- `nativewind-env.d.ts` - TypeScript definitions

## Video Player Features

### MP4 Video Player
- Custom play/pause controls
- Toggle visibility of native controls
- Proper error handling

### HLS/M3U8 Stream Player
- Adaptive streaming support
- Multiple bitrate handling
- Stream-specific UI indicators

### Simple Video Player
- Minimal interface
- Basic playback controls
- Simplified user experience

## Testing

The app includes Jest configuration with proper mocking for:
- react-native-video
- React Navigation
- React Native dependencies

Run tests with:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React Native Video](https://github.com/react-native-video/react-native-video) for video playback capabilities
- [React Navigation](https://reactnavigation.org/) for navigation
- [NativeWind](https://www.nativewind.dev/) for styling
- Sample videos from [Big Buck Bunny](https://peach.blender.org/) and [Elephants Dream](https://orange.blender.org/)