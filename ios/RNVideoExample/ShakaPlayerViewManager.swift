import UIKit
import AVFoundation
import React

class ShakaPlayerView: UIView {
    private var player: AVPlayer?
    private var playerLayer: AVPlayerLayer?
    private var timeObserver: Any?
    private var statusObserver: NSKeyValueObservation?
    private var rateObserver: NSKeyValueObservation?
    private var bufferObserver: NSKeyValueObservation?
    
    @objc var onReady: RCTDirectEventBlock?
    @objc var onPlay: RCTDirectEventBlock?
    @objc var onPause: RCTDirectEventBlock?
    @objc var onBuffer: RCTDirectEventBlock?
    @objc var onError: RCTDirectEventBlock?
    @objc var onProgress: RCTDirectEventBlock?
    @objc var onEnd: RCTDirectEventBlock?
    
    var viewId: Int = 0
    private weak var playerModule: ShakaPlayerModule?
    
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupPlayer()
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        setupPlayer()
    }
    
    private func setupPlayer() {
        player = AVPlayer()
        playerLayer = AVPlayerLayer(player: player)
        playerLayer?.videoGravity = .resizeAspect
        
        if let playerLayer = playerLayer {
            layer.addSublayer(playerLayer)
        }
        
        setupObservers()
    }
    
    func setPlayerModule(_ module: ShakaPlayerModule) {
        self.playerModule = module
        if let player = player {
            module.registerPlayer(player, forViewId: viewId)
            module.registerView(self, forViewId: viewId)
        }
    }
    
    private func setupObservers() {
        guard let player = player else { return }
        
        // Progress observer
        let interval = CMTime(seconds: 0.25, preferredTimescale: CMTimeScale(NSEC_PER_SEC))
        timeObserver = player.addPeriodicTimeObserver(forInterval: interval, queue: .main) { [weak self] time in
            guard let self = self,
                  let duration = self.player?.currentItem?.duration,
                  !duration.seconds.isNaN else { return }
            
            self.onProgress?([
                "currentTime": time.seconds,
                "duration": duration.seconds
            ])
        }
        
        // Rate observer (play/pause)
        rateObserver = player.observe(\.rate, options: [.new]) { [weak self] player, _ in
            guard let self = self else { return }
            if player.rate > 0 {
                self.onPlay?([:])
            } else if player.rate == 0 {
                self.onPause?([:])
            }
        }
        
        // Buffer observer
        NotificationCenter.default.addObserver(
            self,
            selector: #selector(playerItemDidPlayToEndTime),
            name: .AVPlayerItemDidPlayToEndTime,
            object: player.currentItem
        )
    }
    
    @objc private func playerItemDidPlayToEndTime() {
        onEnd?([:])
    }
    
    func updatePlayerItem() {
        guard let player = player else { return }
        // Remove old observers
        statusObserver?.invalidate()
        bufferObserver?.invalidate()
        
        // Setup new item observers
        setupItemObservers()
    }
    
    private func setupItemObservers() {
        guard let player = player else { return }
        
        statusObserver = player.currentItem?.observe(\.status, options: [.new]) { [weak self] item, _ in
            guard let self = self else { return }
            
            switch item.status {
            case .readyToPlay:
                self.onReady?([
                    "duration": item.duration.seconds
                ])
            case .failed:
                if let error = item.error {
                    self.onError?([
                        "error": error.localizedDescription
                    ])
                }
            default:
                break
            }
        }
        
        bufferObserver = player.currentItem?.observe(\.isPlaybackLikelyToKeepUp, options: [.new]) { [weak self] item, _ in
            guard let self = self else { return }
            self.onBuffer?([
                "isBuffering": !item.isPlaybackLikelyToKeepUp
            ])
        }
    }
    
    private func cleanupObservers() {
        if let timeObserver = timeObserver {
            player?.removeTimeObserver(timeObserver)
            self.timeObserver = nil
        }
        statusObserver?.invalidate()
        rateObserver?.invalidate()
        bufferObserver?.invalidate()
        NotificationCenter.default.removeObserver(self)
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        playerLayer?.frame = bounds
    }
    
    deinit {
        cleanupObservers()
    }
}

@objc(ShakaPlayerViewManager)
class ShakaPlayerViewManager: RCTViewManager {
    private var nextViewId: Int = 0
    
    override func view() -> UIView! {
        let view = ShakaPlayerView()
        view.viewId = nextViewId
        nextViewId += 1
        
        // Register view with the module
        DispatchQueue.main.async { [weak self] in
            guard let bridge = self?.bridge else { return }
            if let module = bridge.module(forName: "ShakaPlayerModule") as? ShakaPlayerModule {
                view.setPlayerModule(module)
            }
        }
        
        return view
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
