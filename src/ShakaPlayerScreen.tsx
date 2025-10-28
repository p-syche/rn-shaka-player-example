import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ShakaPlayer } from './shakaPlayer';
import type { ShakaPlayerControls } from './shakaPlayer';

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
    // Clear existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }

    // Show controls
    setShowControls(true);

    // Hide controls after 6 seconds if playing
    if (!paused) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 6000);
    }
  }, [paused]);

  // Show controls when paused or when user interacts
  React.useEffect(() => {
    if (paused) {
      setShowControls(true);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    } else {
      // Reset timeout when playback starts
      resetControlsTimeout();
    }
  }, [paused, resetControlsTimeout]);

  // Cleanup timeout on unmount
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
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <ShakaPlayer
          ref={playerRef}
          source={{ uri: VIDEO_URL }}
          style={styles.player}
          paused={paused}
          onReady={() => {
            console.log('Player ready');
            setIsBuffering(false); // Explicitly clear buffering on ready
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
        
        {/* Touchable overlay to show controls on tap */}
        <TouchableOpacity 
          style={styles.touchOverlay} 
          activeOpacity={1}
          onPress={resetControlsTimeout}
        />
        
        {isBuffering && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Buffering...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorOverlay}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}
      </View>

      {showControls && (
        <View style={styles.controls}>
          <View style={styles.progressContainer}>
            <Text style={styles.timeText}>{formatTime(progress.currentTime)}</Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(progress.currentTime / progress.duration) * 100}%` }
                ]} 
              />
            </View>
            <Text style={styles.timeText}>{formatTime(progress.duration)}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSeekBackward}>
              <Text style={styles.buttonText}>-10s</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
              <Text style={styles.playButtonText}>{paused ? '▶' : '⏸'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSeekForward}>
              <Text style={styles.buttonText}>+10s</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showControls && (
        <View style={styles.info}>
          <Text style={styles.infoTitle}>Tears of Steel</Text>
          <Text style={styles.infoDescription}>
            Sample video demonstrating Shaka Player with native playback
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  playerContainer: {
    flex: 1,
    backgroundColor: '#000',
    position: 'relative',
  },
  player: {
    width: '100%',
    height: '100%',
  },
  touchOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 20,
  },
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorText: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 40,
    backgroundColor: 'rgba(26,26,26,0.9)',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#444',
    marginHorizontal: 20,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1e90ff',
  },
  timeText: {
    color: '#fff',
    fontSize: 18,
    width: 80,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    marginHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  playButtonText: {
    color: '#fff',
    fontSize: 32,
  },
  info: {
    position: 'absolute',
    top: 40,
    left: 40,
    right: 40,
    padding: 30,
    backgroundColor: 'rgba(26,26,26,0.8)',
    borderRadius: 8,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoDescription: {
    color: '#aaa',
    fontSize: 18,
    lineHeight: 24,
  },
});
