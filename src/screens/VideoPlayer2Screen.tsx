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

const VideoPlayer2Screen: React.FC = () => {
  const navigation = useNavigation();
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Sample M3U8 stream URL
  const videoUrl = 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8';

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onVideoError = (error: any) => {
    Alert.alert('Video Error', 'Failed to load stream: ' + error.error.errorString);
  };

  const onVideoLoad = () => {
    console.log('M3U8 stream loaded successfully');
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
        <Text className="text-white text-lg font-semibold">M3U8 Stream Player</Text>
      </View>

      {/* Video Player */}
      <View className="flex-1 bg-black justify-center">
        <Video
          ref={videoRef}
          source={{uri: videoUrl}}
          style={styles.video}
          controls={showControls}
          paused={!isPlaying}
          resizeMode="contain"
          onLoad={onVideoLoad}
          onError={onVideoError}
          poster="https://via.placeholder.com/640x360/000000/FFFFFF?text=Loading+Stream..."
        />
      </View>

      {/* Custom Controls */}
      <View className="bg-gray-900 p-4">
        <View className="flex-row justify-center space-x-4">
          <TouchableOpacity
            onPress={togglePlayPause}
            className="bg-green-500 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setShowControls(!showControls)}
            className="bg-gray-600 px-6 py-3 rounded-lg"
          >
            <Text className="text-white font-semibold">
              {showControls ? 'Hide Controls' : 'Show Controls'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text className="text-gray-300 text-center mt-4 text-sm">
          Streaming: Apple Test Stream (HLS/M3U8)
        </Text>
        <Text className="text-gray-400 text-center mt-2 text-xs">
          Adaptive streaming with multiple bitrates
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

export default VideoPlayer2Screen;