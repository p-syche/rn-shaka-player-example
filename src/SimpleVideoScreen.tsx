import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Video, { DRMType } from 'react-native-video';

export const SimpleVideoScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Video
        source={{
          uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
          drm: {
            type: DRMType.WIDEVINE,
            licenseServer: 'https://license.example.com/widevine',
            headers: {
              Authorization: 'Bearer your-token',
            },
          },
        }}
        style={{ width: '100%', aspectRatio: 16 / 9 }}
        controls
        onLoadStart={() => console.log('Requesting manifest & license')}
        onReadyForDisplay={() => console.log('Decryption complete')}
        onError={e => console.error('Error:', e)}
        onEnd={() => console.log('Session complete, cleanup')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
