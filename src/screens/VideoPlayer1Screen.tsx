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

const VideoPlayer1Screen: React.FC = () => {
  const navigation = useNavigation();
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Sample MP4 video URL
  const videoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onVideoError = (error: any) => {
    Alert.alert('Video Error', 'Failed to load video: ' + error.error.errorString);
  };

  const onVideoLoad = () => {
    console.log('Video loaded successfully');
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
        <Text style={styles.headerTitle}>MP4 Video Player</Text>
      </View>

      {/* Video Player */}
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{uri: videoUrl}}
          style={styles.video}
          controls={showControls}
          paused={!isPlaying}
          resizeMode="contain"
          onLoad={onVideoLoad}
          onError={onVideoError}
          poster="https://via.placeholder.com/640x360/000000/FFFFFF?text=Loading..."
        />
      </View>

      {/* Custom Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={togglePlayPause}
            style={[styles.controlButton, styles.playButton]}
          >
            <Text style={styles.controlButtonText}>
              {isPlaying ? 'Pause' : 'Play'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => setShowControls(!showControls)}
            style={[styles.controlButton, styles.toggleButton]}
          >
            <Text style={styles.controlButtonText}>
              {showControls ? 'Hide Controls' : 'Show Controls'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.videoInfo}>
          Playing: Big Buck Bunny (MP4)
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  controlButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  playButton: {
    backgroundColor: '#3b82f6',
  },
  toggleButton: {
    backgroundColor: '#6b7280',
  },
  controlButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  videoInfo: {
    color: '#d1d5db',
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
});

export default VideoPlayer1Screen;