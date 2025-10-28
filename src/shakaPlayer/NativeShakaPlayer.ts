import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  createPlayer(viewId: number): void;
  destroyPlayer(viewId: number): void;
  loadVideo(viewId: number, url: string): void;
  play(viewId: number): void;
  pause(viewId: number): void;
  seekTo(viewId: number, position: number): void;
  setVolume(viewId: number, volume: number): void;
  getCurrentPosition(viewId: number): Promise<number>;
  getDuration(viewId: number): Promise<number>;
  getIsPlaying(viewId: number): Promise<boolean>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ShakaPlayerModule');
