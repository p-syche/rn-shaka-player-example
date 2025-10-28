import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, ViewStyle, findNodeHandle } from 'react-native';
import { ShakaPlayerNativeView } from './ShakaPlayerNativeView';
import type { ShakaPlayerViewProps } from './ShakaPlayerNativeView';
import NativeShakaPlayer from './NativeShakaPlayer';

export interface ShakaPlayerControls {
  play: () => void;
  pause: () => void;
  seekTo: (position: number) => void;
  setVolume: (volume: number) => void;
  getCurrentPosition: () => Promise<number>;
  getDuration: () => Promise<number>;
  getIsPlaying: () => Promise<boolean>;
  loadVideo: (url: string) => void;
}

export interface ShakaPlayerProps {
  source: { uri: string };
  style?: ViewStyle;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onBuffer?: (isBuffering: boolean) => void;
  onError?: (error: string) => void;
  onProgress?: (data: { currentTime: number; duration: number }) => void;
  onEnd?: () => void;
  paused?: boolean;
  volume?: number;
}

export const ShakaPlayer = React.forwardRef<ShakaPlayerControls, ShakaPlayerProps>(
  (
    {
      source,
      style,
      onReady,
      onPlay,
      onPause,
      onBuffer,
      onError,
      onProgress,
      onEnd,
      paused = false,
      volume = 1.0,
    },
    ref
  ) => {
    const nativeViewRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const loadedUriRef = useRef<string | null>(null);
    const viewIdRef = useRef<number | null>(null);

    // Get the native view ID
    useEffect(() => {
      if (nativeViewRef.current) {
        const nodeHandle = findNodeHandle(nativeViewRef.current);
        if (nodeHandle) {
          viewIdRef.current = nodeHandle;
          console.log('[ShakaPlayer] Native view ID:', nodeHandle);
        }
      }
    }, []);

    useEffect(() => {
      const viewId = viewIdRef.current;
      if (!viewId) return;
      
      // Load video when source changes
      if (source?.uri && source.uri !== loadedUriRef.current) {
        console.log('[ShakaPlayer] Loading video:', source.uri, 'viewId:', viewId);
        loadedUriRef.current = source.uri;
        setIsReady(false);
        
        // Small delay to ensure native view is mounted
        setTimeout(() => {
          NativeShakaPlayer.loadVideo(viewId, source.uri);
        }, 100);
      }
    }, [source?.uri, viewIdRef.current]);

    useEffect(() => {
      const viewId = viewIdRef.current;
      if (!viewId) return;
      
      // Only control playback after video is ready
      if (isReady) {
        console.log('[ShakaPlayer] Playback control - paused:', paused, 'viewId:', viewId);
        if (paused) {
          NativeShakaPlayer.pause(viewId);
        } else {
          NativeShakaPlayer.play(viewId);
        }
      }
    }, [paused, isReady, viewIdRef.current]);

    useEffect(() => {
      const viewId = viewIdRef.current;
      if (!viewId) return;
      NativeShakaPlayer.setVolume(viewId, volume);
    }, [volume, viewIdRef.current]);

    const controls: ShakaPlayerControls = React.useMemo(() => ({
      play: () => {
        const viewId = viewIdRef.current;
        if (!viewId) return;
        console.log('[ShakaPlayer] Manual play, viewId:', viewId);
        NativeShakaPlayer.play(viewId);
      },
      pause: () => {
        const viewId = viewIdRef.current;
        if (!viewId) return;
        console.log('[ShakaPlayer] Manual pause, viewId:', viewId);
        NativeShakaPlayer.pause(viewId);
      },
      seekTo: (position: number) => {
        const viewId = viewIdRef.current;
        if (!viewId) return;
        console.log('[ShakaPlayer] Seek to:', position, 'viewId:', viewId);
        NativeShakaPlayer.seekTo(viewId, position);
      },
      setVolume: (vol: number) => {
        const viewId = viewIdRef.current;
        if (!viewId) return;
        NativeShakaPlayer.setVolume(viewId, vol);
      },
      getCurrentPosition: () => {
        const viewId = viewIdRef.current;
        if (!viewId) return Promise.resolve(0);
        return NativeShakaPlayer.getCurrentPosition(viewId);
      },
      getDuration: () => {
        const viewId = viewIdRef.current;
        if (!viewId) return Promise.resolve(0);
        return NativeShakaPlayer.getDuration(viewId);
      },
      getIsPlaying: () => {
        const viewId = viewIdRef.current;
        if (!viewId) return Promise.resolve(false);
        return NativeShakaPlayer.getIsPlaying(viewId);
      },
      loadVideo: (url: string) => {
        const viewId = viewIdRef.current;
        if (!viewId) return;
        loadedUriRef.current = url;
        NativeShakaPlayer.loadVideo(viewId, url);
      },
    }), []);

    React.useImperativeHandle(ref, () => controls, [controls]);

    const handleReady = useCallback(
      (event: { nativeEvent: { duration: number } }) => {
        console.log('[ShakaPlayer] Video ready, duration:', event.nativeEvent.duration);
        setIsReady(true);
        onReady?.();
        
        // Auto-play if not paused
        if (!paused) {
          const viewId = viewIdRef.current;
          if (viewId) {
            console.log('[ShakaPlayer] Auto-playing after ready, viewId:', viewId);
            setTimeout(() => {
              NativeShakaPlayer.play(viewId);
            }, 100);
          }
        }
      },
      [onReady, paused]
    );

    const handlePlay = useCallback(() => {
      console.log('[ShakaPlayer] onPlay event');
      onPlay?.();
    }, [onPlay]);

    const handlePause = useCallback(() => {
      console.log('[ShakaPlayer] onPause event');
      onPause?.();
    }, [onPause]);

    const handleBuffer = useCallback(
      (event: { nativeEvent: { isBuffering: boolean } }) => {
        console.log('[ShakaPlayer] Buffering:', event.nativeEvent.isBuffering);
        onBuffer?.(event.nativeEvent.isBuffering);
      },
      [onBuffer]
    );

    const handleError = useCallback(
      (event: { nativeEvent: { error: string } }) => {
        console.log('[ShakaPlayer] Error:', event.nativeEvent.error);
        onError?.(event.nativeEvent.error);
      },
      [onError]
    );

    const handleProgress = useCallback(
      (event: { nativeEvent: { currentTime: number; duration: number } }) => {
        onProgress?.(event.nativeEvent);
      },
      [onProgress]
    );

    const handleEnd = useCallback(() => {
      console.log('[ShakaPlayer] Video ended');
      setIsReady(false);
      onEnd?.();
    }, [onEnd]);

    return (
      <ShakaPlayerNativeView
        ref={nativeViewRef}
        style={[styles.container, style]}
        onReady={handleReady}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={handleBuffer}
        onError={handleError}
        onProgress={handleProgress}
        onEnd={handleEnd}
      />
    );
  }
);

ShakaPlayer.displayName = 'ShakaPlayer';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
});
