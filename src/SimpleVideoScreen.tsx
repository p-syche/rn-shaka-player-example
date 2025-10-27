import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export const SimpleVideoScreen = () => {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Simple video Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
