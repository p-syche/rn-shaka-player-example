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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Simple Video Player</Text>
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
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
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={togglePlayPause}
          style={styles.playButton}
        >
          <Text style={styles.playButtonText}>
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.videoInfo}>
          Playing: Elephants Dream (Simple Player)
        </Text>
        <Text style={styles.videoSubInfo}>
          Basic video playback with minimal controls
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    backgroundColor: '#111827',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backText: {
    color: 'white',
    fontSize: 18,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: 250,
  },
  controlsContainer: {
    backgroundColor: '#111827',
    padding: 16,
  },
  playButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignSelf: 'center',
  },
  playButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  videoInfo: {
    color: '#d1d5db',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
  videoSubInfo: {
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 12,
  },
});

export default VideoPlayer3Screen;