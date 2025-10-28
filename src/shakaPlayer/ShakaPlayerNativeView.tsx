import { requireNativeComponent } from 'react-native';
import type { ViewProps } from 'react-native';

export interface ShakaPlayerViewProps extends ViewProps {
  onReady?: (event: { nativeEvent: { duration: number } }) => void;
  onPlay?: (event: { nativeEvent: {} }) => void;
  onPause?: (event: { nativeEvent: {} }) => void;
  onBuffer?: (event: { nativeEvent: { isBuffering: boolean } }) => void;
  onError?: (event: { nativeEvent: { error: string } }) => void;
  onProgress?: (event: { nativeEvent: { currentTime: number; duration: number } }) => void;
  onEnd?: (event: { nativeEvent: {} }) => void;
  showNativeControls?: boolean;
}

const ComponentName = 'ShakaPlayerView';

export const ShakaPlayerNativeView =
  requireNativeComponent<ShakaPlayerViewProps>(ComponentName);
