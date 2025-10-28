import Foundation
import AVFoundation
import React

@objc(ShakaPlayerModule)
class ShakaPlayerModule: NSObject {
    private var players: [Int: AVPlayer] = [:]
    private var observers: [Int: Any] = [:]
    private var views: [Int: ShakaPlayerView] = [:]
    
    func registerPlayer(_ player: AVPlayer, forViewId viewId: Int) {
        DispatchQueue.main.async {
            self.players[viewId] = player
        }
    }
    
    func registerView(_ view: ShakaPlayerView, forViewId viewId: Int) {
        DispatchQueue.main.async {
            self.views[viewId] = view
        }
    }
    
    @objc
    func createPlayer(_ viewId: NSNumber) {
        // Player is created by the view, this just ensures compatibility
    }
    
    @objc
    func destroyPlayer(_ viewId: NSNumber) {
        let id = viewId.intValue
        DispatchQueue.main.async {
            if let observer = self.observers[id] {
                self.players[id]?.removeTimeObserver(observer)
                self.observers.removeValue(forKey: id)
            }
            self.players.removeValue(forKey: id)
            self.views.removeValue(forKey: id)
        }
    }
    
    @objc
    func loadVideo(_ viewId: NSNumber, url: NSString) {
        let id = viewId.intValue
        guard let player = players[id],
              let videoURL = URL(string: url as String) else {
            return
        }
        
        DispatchQueue.main.async {
            let playerItem = AVPlayerItem(url: videoURL)
            player.replaceCurrentItem(with: playerItem)
            
            // Notify view to update item observers
            self.views[id]?.updatePlayerItem()
        }
    }
    
    @objc
    func play(_ viewId: NSNumber) {
        let id = viewId.intValue
        guard let player = players[id] else { return }
        
        DispatchQueue.main.async {
            player.play()
        }
    }
    
    @objc
    func pause(_ viewId: NSNumber) {
        let id = viewId.intValue
        guard let player = players[id] else { return }
        
        DispatchQueue.main.async {
            player.pause()
        }
    }
    
    @objc
    func seekTo(_ viewId: NSNumber, position: NSNumber) {
        let id = viewId.intValue
        guard let player = players[id] else { return }
        
        let time = CMTime(seconds: position.doubleValue, preferredTimescale: 1000)
        DispatchQueue.main.async {
            player.seek(to: time)
        }
    }
    
    @objc
    func setVolume(_ viewId: NSNumber, volume: NSNumber) {
        let id = viewId.intValue
        guard let player = players[id] else { return }
        
        DispatchQueue.main.async {
            player.volume = volume.floatValue
        }
    }
    
    @objc
    func getCurrentPosition(_ viewId: NSNumber,
                           resolve: @escaping RCTPromiseResolveBlock,
                           reject: @escaping RCTPromiseRejectBlock) {
        let id = viewId.intValue
        guard let player = players[id] else {
            reject("ERROR", "Player not found", nil)
            return
        }
        
        DispatchQueue.main.async {
            let currentTime = player.currentTime().seconds
            resolve(currentTime)
        }
    }
    
    @objc
    func getDuration(_ viewId: NSNumber,
                    resolve: @escaping RCTPromiseResolveBlock,
                    reject: @escaping RCTPromiseRejectBlock) {
        let id = viewId.intValue
        guard let player = players[id],
              let duration = player.currentItem?.duration else {
            reject("ERROR", "Player or duration not found", nil)
            return
        }
        
        DispatchQueue.main.async {
            let durationSeconds = duration.seconds
            if durationSeconds.isNaN {
                resolve(0)
            } else {
                resolve(durationSeconds)
            }
        }
    }
    
    @objc
    func getIsPlaying(_ viewId: NSNumber,
                     resolve: @escaping RCTPromiseResolveBlock,
                     reject: @escaping RCTPromiseRejectBlock) {
        let id = viewId.intValue
        guard let player = players[id] else {
            reject("ERROR", "Player not found", nil)
            return
        }
        
        DispatchQueue.main.async {
            resolve(player.rate > 0)
        }
    }
    
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
