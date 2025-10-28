import {useRef, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Video, { DRMType, OnProgressData, OnLoadData, VideoRef } from 'react-native-video';
import Slider from '@react-native-community/slider';
import { videoControlStyles, sliderColors } from './styles/videoControls';

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
    setIsPlaying(true);
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
    <View style={videoControlStyles.container}>
      <View style={videoControlStyles.videoContainer}>
        <Video
          ref={videoRef}
          source={{
            uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          }}
          style={videoControlStyles.video}
          controls={false}
          paused={!isPlaying}
          onProgress={onProgress}
          onLoad={onLoad}
          onError={e => console.error('Video Error:', e)}
        />
      </View>
      
      <View style={videoControlStyles.controlsContainer}>
        <TouchableOpacity style={videoControlStyles.playButtonSmall} onPress={togglePlayPause}>
          <Text style={videoControlStyles.playButtonTextSmall}>
            {isPlaying ? '❚❚' : '▶'}
          </Text>
        </TouchableOpacity>
        
        <Slider
          style={videoControlStyles.slider}
          minimumValue={0}
          maximumValue={1}
          value={duration > 0 ? currentTime / duration : 0}
          onValueChange={onSliderValueChange}
          onSlidingStart={onSlidingStart}
          onSlidingComplete={onSlidingComplete}
          minimumTrackTintColor={sliderColors.minimumTrackTintColor}
          maximumTrackTintColor={sliderColors.maximumTrackTintColor}
          thumbTintColor={sliderColors.thumbTintColor}
          step={0.01}
        />
        
        <Text style={videoControlStyles.timeTextSmall}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>
    </View>
  );
};
