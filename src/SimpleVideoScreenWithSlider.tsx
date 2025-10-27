import {useRef, useState} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Video, { DRMType, OnProgressData, OnLoadData, VideoRef } from 'react-native-video';
import Slider from '@react-native-community/slider';

// Helper function to format time in MM:SS format
const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) return '00:00';
  
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const SimpleVideoScreenWithSlider = () => {
  const videoRef = useRef<VideoRef>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const onProgress = (data: OnProgressData) => {
    if (!seeking) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: OnLoadData) => {
    setDuration(data.duration);
    setIsPlaying(true); // Auto-start playing
  };

  const onSliderValueChange = (value: number) => {
    if (!seeking) return;
    const newTime = value * duration;
    setCurrentTime(newTime);
  };

  const onSlidingStart = () => {
    setSeeking(true);
  };

  const onSlidingComplete = (value: number) => {
    const seekTime = value * duration;
    if (videoRef.current) {
      videoRef.current.seek(seekTime);
    }
    setSeeking(false);
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.resume();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          }}
          style={styles.video}
          controls={false}
          paused={!isPlaying}
          onProgress={onProgress}
          onLoad={onLoad}
          onError={e => console.error('Video Error:', e)}
        />
      </View>
      
      {/* Custom Controls Container */}
      <View style={styles.controlsContainer}>
        {/* Play/Pause Button */}
        <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
          <Text style={styles.playButtonText}>
            {isPlaying ? '⏸️' : '▶️'}
          </Text>
        </TouchableOpacity>
        
        {/* Video Slider */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={duration > 0 ? currentTime / duration : 0}
          onValueChange={onSliderValueChange}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          minimumTrackTintColor="#1976D2"
          maximumTrackTintColor="#666666"
          thumbTintColor="#1976D2"
          step={0.01}
        />
        
        {/* Video Progress Indicator */}
        <Text style={styles.timeText}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingBottom: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  playButtonText: {
    fontSize: 20,
    color: '#fff',
  },
  timeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '500',
    minWidth: 80,
    textAlign: 'center',
    marginLeft: 10,
  },
  slider: {
    flex: 1,
    height: 40,
    marginLeft: 15,
  },
});
