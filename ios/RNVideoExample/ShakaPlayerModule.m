#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>

@interface RCT_EXTERN_MODULE(ShakaPlayerModule, NSObject)

RCT_EXTERN_METHOD(createPlayer:(nonnull NSNumber *)viewId)
RCT_EXTERN_METHOD(destroyPlayer:(nonnull NSNumber *)viewId)
RCT_EXTERN_METHOD(loadVideo:(nonnull NSNumber *)viewId url:(nonnull NSString *)url)
RCT_EXTERN_METHOD(play:(nonnull NSNumber *)viewId)
RCT_EXTERN_METHOD(pause:(nonnull NSNumber *)viewId)
RCT_EXTERN_METHOD(seekTo:(nonnull NSNumber *)viewId position:(nonnull NSNumber *)position)
RCT_EXTERN_METHOD(setVolume:(nonnull NSNumber *)viewId volume:(nonnull NSNumber *)volume)
RCT_EXTERN_METHOD(getCurrentPosition:(nonnull NSNumber *)viewId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getDuration:(nonnull NSNumber *)viewId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(getIsPlaying:(nonnull NSNumber *)viewId
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

@interface RCT_EXTERN_MODULE(ShakaPlayerViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(onReady, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPlay, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPause, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onBuffer, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onProgress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onEnd, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(showNativeControls, BOOL)

@end
