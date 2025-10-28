import * as React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ShakaPlayer } from './shakaPlayer';
import type { ShakaPlayerControls } from './shakaPlayer';
import { videoControlStyles } from './styles/videoControls';

const VIDEO_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

export const ShakaPlayerScreen = () => {
  const [paused, setPaused] = React.useState(true);
  const [isBuffering, setIsBuffering] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [progress, setProgress] = React.useState({ currentTime: 0, duration: 0 });
  const [showControls, setShowControls] = React.useState(true);
  const playerRef = React.useRef<ShakaPlayerControls>(null);
  const controlsTimeoutRef = React.useRef<number | null>(null);

  const resetControlsTimeout = React.useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    setShowControls(true);

    if (!paused) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 6000);
    }
  }, [paused]);

  React.useEffect(() => {
    if (paused) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    } else {
      resetControlsTimeout();
    }
  }, [paused, resetControlsTimeout]);

  React.useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (paused) {
      playerRef.current?.play();
    } else {
      playerRef.current?.pause();
    }
    setPaused(!paused);
    resetControlsTimeout();
  };

  const handleSeekForward = () => {
    const newTime = Math.min(progress.currentTime + 10, progress.duration);
    playerRef.current?.seekTo(newTime);
    resetControlsTimeout();
  };

  const handleSeekBackward = () => {
    const newTime = Math.max(progress.currentTime - 10, 0);
    playerRef.current?.seekTo(newTime);
    resetControlsTimeout();
  };

  return (
    <View style={videoControlStyles.container}>
      <View style={videoControlStyles.playerContainer}>
        <ShakaPlayer
          ref={playerRef}
          source={{ uri: VIDEO_URL }}
          style={videoControlStyles.player}
          paused={paused}
          onReady={() => {
            console.log('Player ready');
            setIsBuffering(false);
          }}
          onPlay={() => console.log('Playing')}
          onPause={() => console.log('Paused')}
          onBuffer={(buffering) => {
            console.log('Buffering state:', buffering);
            setIsBuffering(buffering);
          }}
          onError={(err) => setError(err)}
          onProgress={(data) => setProgress(data)}
          onEnd={() => {
            setPaused(true);
            console.log('Video ended');
          }}
        />
        
        <TouchableOpacity 
          style={videoControlStyles.touchOverlay} 
          activeOpacity={1}
          onPress={resetControlsTimeout}
        />
        
        {isBuffering && (
          <View style={videoControlStyles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={videoControlStyles.loadingText}>Buffering...</Text>
          </View>
        )}

        {error && (
          <View style={videoControlStyles.errorOverlay}>
            <Text style={videoControlStyles.errorText}>Error: {error}</Text>
          </View>
        )}
      </View>

      {showControls && (
        <View style={videoControlStyles.controls}>
          <View style={videoControlStyles.progressContainer}>
            <Text style={videoControlStyles.timeText}>{formatTime(progress.currentTime)}</Text>
            <View style={videoControlStyles.progressBar}>
              <View 
                style={[
                  videoControlStyles.progressFill, 
                  { width: `${(progress.currentTime / progress.duration) * 100}%` }
                ]} 
              />
            </View>
            <Text style={videoControlStyles.timeText}>{formatTime(progress.duration)}</Text>
          </View>

          <View style={videoControlStyles.buttonContainer}>
            <TouchableOpacity style={videoControlStyles.button} onPress={handleSeekBackward}>
              <Text style={videoControlStyles.buttonText}>-10s</Text>
            </TouchableOpacity>

            <TouchableOpacity style={videoControlStyles.playButton} onPress={handlePlayPause}>
              <Text style={videoControlStyles.playButtonText}>{paused ? '▶' : '❚❚'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={videoControlStyles.button} onPress={handleSeekForward}>
              <Text style={videoControlStyles.buttonText}>+10s</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showControls && (
        <View style={videoControlStyles.info}>
          <Text style={videoControlStyles.infoTitle}>Tears of Steel</Text>
          <Text style={videoControlStyles.infoDescription}>
            Sample video demonstrating Shaka Player with native playback
          </Text>
        </View>
      )}
    </View>
  );
};
