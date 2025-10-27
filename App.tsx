import * as React from 'react';
import { View, Text, Pressable } from 'react-native';
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SimpleVideoScreen } from './src/SimpleVideoScreen';
import { ShakaPlayerScreen } from './src/ShakaPlayerScreen';

type RootStackParamList = {
  Home: undefined;
  SimpleVideoScreen: undefined;
  ShakaPlayerScreen: undefined;
};

function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => navigation.navigate("SimpleVideoScreen")}>
        <Text>Simple Video Screen</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ShakaPlayerScreen")}>
        <Text>Shaka Player Screen</Text>
      </Pressable>
      <Pressable onPress={() => console.log("hello button 3")}>
        <Text>will be button 3</Text>
      </Pressable>
    </View>
  );
}

const RootStack = createNativeStackNavigator({
  screens: {
    Home: HomeScreen,
    SimpleVideoScreen: SimpleVideoScreen,
    ShakaPlayerScreen: ShakaPlayerScreen
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}