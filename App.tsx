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
import { ShakaPlayerNativeVideoScreen } from './src/ShakaPlayerNativeVideoScreen';
import { SimpleVideoScreenWithSlider } from './src/SimpleVideoScreenWithSlider';
import { colors, typography, spacing, borderRadius } from './src/styles/theme';

type RootStackParamList = {
  Home: undefined;
  SimpleVideoScreen: undefined;
  SimpleVideoScreenWithSlider: undefined;
  ShakaPlayerScreen: undefined;
  ShakaPlayerNativeVideoScreen: undefined;
};

function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shaka Player Demo</Text>
        <Text style={styles.subtitle}>React Native Video Playback Examples</Text>
      </View>
      
      <View style={styles.buttonGroup}>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('SimpleVideoScreen')}>
          <Text style={styles.buttonText}>Simple Video Screen</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('SimpleVideoScreenWithSlider')}>
          <Text style={styles.buttonText}>Simple Video with Custom Controls</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('ShakaPlayerNativeVideoScreen')}>
          <Text style={styles.buttonText}>Shaka Player with Native Controls</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={() => navigation.navigate('ShakaPlayerScreen')}>
          <Text style={styles.buttonText}>Shaka Player with Custom Controls</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.display,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 400,
  },
  pressable: {
    padding: spacing.md,
    borderWidth: 2,
    borderRadius: borderRadius.md,
    borderColor: colors.purple.vibrant,
    margin: spacing.sm,
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
  },
});

const RootStack = createNativeStackNavigator({
  screenOptions: {
    headerStyle: {
      backgroundColor: colors.background.primary,
    },
    headerTintColor: colors.text.primary,
    headerTitleStyle: {
      fontWeight: typography.fontWeight.bold,
      fontSize: typography.fontSize.xl,
    },
    headerShadowVisible: false,
    headerBackTitle: 'Back',
  },
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Shaka Player Demo',
      },
    },
    SimpleVideoScreen: {
      screen: SimpleVideoScreen,
      options: {
        title: 'Simple Video',
      },
    },
    SimpleVideoScreenWithSlider: {
      screen: SimpleVideoScreenWithSlider,
      options: {
        title: 'Custom Controls',
      },
    },
    ShakaPlayerScreen: {
      screen: ShakaPlayerScreen,
      options: {
        title: 'Shaka Player',
      },
    },
    ShakaPlayerNativeVideoScreen: {
      screen: ShakaPlayerNativeVideoScreen,
      options: {
        title: 'Shaka Native',
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return <Navigation />;
}
