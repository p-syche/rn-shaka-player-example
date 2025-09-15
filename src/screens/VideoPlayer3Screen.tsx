import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  StyleSheet,
} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {useNavigation} from '@react-navigation/native';

const VideoPlayer3Screen: React.FC = () => {
  const navigation = useNavigation();
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Another sample video URL
  const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onVideoError = (error: any) => {
    Alert.alert('Video Error', 'Failed to load video: ' + error.error.errorString);
  };

  const onVideoLoad = () => {
    console.log('Simple video loaded successfully');
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View className="bg-gray-900 px-4 py-3 flex-row items-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <Text className="text-white text-lg">← Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Simple Video Player</Text>
      </View>

      {/* Video Player */}
      <View className="flex-1 bg-black justify-center">
        <Video
          ref={videoRef}
          source={{uri: videoUrl}}
          style={styles.video}
          controls={true}
          paused={!isPlaying}
          resizeMode="contain"
          onLoad={onVideoLoad}
          onError={onVideoError}
          poster="https://via.placeholder.com/640x360/000000/FFFFFF?text=Simple+Player"
        />
      </View>

      {/* Minimal Controls */}
      <View className="bg-gray-900 p-4">
        <TouchableOpacity
          onPress={togglePlayPause}
          className="bg-purple-500 px-8 py-4 rounded-lg self-center"
        >
          <Text className="text-white font-semibold text-lg">
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </Text>
        </TouchableOpacity>
        
        <Text className="text-gray-300 text-center mt-4 text-sm">
          Playing: Elephants Dream (Simple Player)
        </Text>
        <Text className="text-gray-400 text-center mt-2 text-xs">
          Basic video playback with minimal controls
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: 250,
  },
});

export default VideoPlayer3Screen;