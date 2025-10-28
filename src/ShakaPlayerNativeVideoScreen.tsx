import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ShakaPlayer } from './shakaPlayer';

const VIDEO_URL = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

export const ShakaPlayerNativeVideoScreen = () => {
  const playerRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <ShakaPlayer
        ref={playerRef}
        source={{ uri: VIDEO_URL }}
        style={styles.player}
        showNativeControls={true}
        onReady={() => console.log('Native Player ready')}
        onPlay={() => console.log('Native Playing')}
        onPause={() => console.log('Native Paused')}
        onBuffer={(buffering) => console.log('Native Buffering:', buffering)}
        onError={(err) => console.error('Native Error:', err)}
        onProgress={(data) => console.log('Native Progress:', data.currentTime)}
        onEnd={() => console.log('Native Video ended')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  player: {
    flex: 1,
  },
});
