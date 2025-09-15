import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
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
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <View className="flex-1 px-6 py-8">
        <Text className="text-3xl font-bold text-center text-gray-800 mb-8">
          Shaka Player Example
        </Text>
        <Text className="text-lg text-center text-gray-600 mb-12">
          Choose a video player to explore
        </Text>
        
        <View className="space-y-6">
          <TouchableOpacity
            className="bg-blue-500 p-6 rounded-lg shadow-lg"
            onPress={() => navigation.navigate('VideoPlayer1')}
          >
            <Text className="text-white text-xl font-semibold text-center">
              MP4 Video Player
            </Text>
            <Text className="text-blue-100 text-sm text-center mt-2">
              Play MP4 video files
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-green-500 p-6 rounded-lg shadow-lg"
            onPress={() => navigation.navigate('VideoPlayer2')}
          >
            <Text className="text-white text-xl font-semibold text-center">
              M3U8 Stream Player
            </Text>
            <Text className="text-green-100 text-sm text-center mt-2">
              Play HLS streaming content
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-500 p-6 rounded-lg shadow-lg"
            onPress={() => navigation.navigate('VideoPlayer3')}
          >
            <Text className="text-white text-xl font-semibold text-center">
              Simple Video Player
            </Text>
            <Text className="text-purple-100 text-sm text-center mt-2">
              Basic video playback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;