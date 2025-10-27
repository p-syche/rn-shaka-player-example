import * as React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { SimpleVideoScreen } from './src/SimpleVideoScreen';
import { ShakaPlayerScreen } from './src/ShakaPlayerScreen';
import { SimpleVideoScreenWithSlider } from './src/SimpleVideoScreenWithSlider';

type RootStackParamList = {
  Home: undefined;
  SimpleVideoScreen: undefined;
  SimpleVideoScreenWithSlider: undefined;
  ShakaPlayerScreen: undefined;
};

function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('SimpleVideoScreen')}>
        <Text>Simple Video Screen</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('SimpleVideoScreenWithSlider')}>
        <Text>Simple Video with custom slider</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => navigation.navigate('ShakaPlayerScreen')}>
        <Text>Shaka Player Screen</Text>
      </Pressable>
      <Pressable style={styles.pressable} onPress={() => console.log('hello button 3')}>
        <Text>will be button 3</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    padding: 8,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "lightblue",
    margin: 10
  },
});

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    SimpleVideoScreen: SimpleVideoScreen,
    SimpleVideoScreenWithSlider: SimpleVideoScreenWithSlider,
    ShakaPlayerScreen: ShakaPlayerScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
