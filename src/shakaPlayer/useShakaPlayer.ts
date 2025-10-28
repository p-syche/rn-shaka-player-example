import { useEffect, useRef, useState, useCallback } from 'react';
import NativeShakaPlayer from './NativeShakaPlayer';

let viewIdCounter = 0;

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

export interface PlayerState {
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  error: string | null;
}

export const useShakaPlayer = () => {
  const viewIdRef = useRef<number>(viewIdCounter++);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    isBuffering: false,
    currentTime: 0,
    duration: 0,
    error: null,
  });

  useEffect(() => {
    const viewId = viewIdRef.current;
    NativeShakaPlayer.createPlayer(viewId);

    return () => {
      NativeShakaPlayer.destroyPlayer(viewId);
    };
  }, []);

  const play = useCallback(() => {
    NativeShakaPlayer.play(viewIdRef.current);
  }, []);

  const pause = useCallback(() => {
    NativeShakaPlayer.pause(viewIdRef.current);
  }, []);

  const seekTo = useCallback((position: number) => {
    NativeShakaPlayer.seekTo(viewIdRef.current, position);
  }, []);

  const setVolume = useCallback((volume: number) => {
    NativeShakaPlayer.setVolume(viewIdRef.current, volume);
  }, []);

  const getCurrentPosition = useCallback(async (): Promise<number> => {
    return await NativeShakaPlayer.getCurrentPosition(viewIdRef.current);
  }, []);

  const getDuration = useCallback(async (): Promise<number> => {
    return await NativeShakaPlayer.getDuration(viewIdRef.current);
  }, []);

  const getIsPlaying = useCallback(async (): Promise<boolean> => {
    return await NativeShakaPlayer.getIsPlaying(viewIdRef.current);
  }, []);

  const loadVideo = useCallback((url: string) => {
    NativeShakaPlayer.loadVideo(viewIdRef.current, url);
  }, []);

  const controls: ShakaPlayerControls = {
    play,
    pause,
    seekTo,
    setVolume,
    getCurrentPosition,
    getDuration,
    getIsPlaying,
    loadVideo,
  };

  return {
    viewId: viewIdRef.current,
    playerState,
    setPlayerState,
    controls,
  };
};
