import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {RootStackParamList} from '../navigation/types';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <View style={styles.content}>
        <Text style={styles.title}>
          Shaka Player Example
        </Text>
        <Text style={styles.subtitle}>
          Choose a video player to explore
        </Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.mp4Button]}
            onPress={() => navigation.navigate('VideoPlayer1')}
          >
            <Text style={styles.buttonText}>
              MP4 Video Player
            </Text>
            <Text style={styles.buttonSubtext}>
              Play MP4 video files
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.hlsButton]}
            onPress={() => navigation.navigate('VideoPlayer2')}
          >
            <Text style={styles.buttonText}>
              M3U8 Stream Player
            </Text>
            <Text style={styles.buttonSubtext}>
              Play HLS streaming content
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.simpleButton]}
            onPress={() => navigation.navigate('VideoPlayer3')}
          >
            <Text style={styles.buttonText}>
              Simple Video Player
            </Text>
            <Text style={styles.buttonSubtext}>
              Basic video playback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 32,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 48,
  },
  buttonContainer: {
    gap: 24,
  },
  button: {
    padding: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mp4Button: {
    backgroundColor: '#3b82f6',
  },
  hlsButton: {
    backgroundColor: '#10b981',
  },
  simpleButton: {
    backgroundColor: '#8b5cf6',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonSubtext: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default HomeScreen;