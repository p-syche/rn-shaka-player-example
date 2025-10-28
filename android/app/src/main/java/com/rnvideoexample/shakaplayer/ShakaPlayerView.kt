package com.rnvideoexample.shakaplayer

import android.content.Context
import android.os.Handler
import android.os.Looper
import android.util.AttributeSet
import android.widget.FrameLayout
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.ui.PlayerView
import androidx.media3.common.Player
import androidx.media3.common.PlaybackException
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.RCTEventEmitter

class ShakaPlayerView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {

    private var playerView: PlayerView
    private var player: ExoPlayer? = null
    private var progressUpdateRunnable: Runnable? = null
    private val handler = Handler(Looper.getMainLooper())
    
    var viewId: Int = 0

    init {
        playerView = PlayerView(context)
        playerView.layoutParams = LayoutParams(
            LayoutParams.MATCH_PARENT,
            LayoutParams.MATCH_PARENT
        )
        playerView.useController = false // Disable ExoPlayer's default controls, we have our own UI
        addView(playerView)
        
        // Set background to see the view bounds
        setBackgroundColor(android.graphics.Color.BLACK)
    }
    
    override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
        super.onLayout(changed, left, top, right, bottom)
        if (changed) {
            android.util.Log.d("ShakaPlayerView", "View laid out: ${right - left}x${bottom - top}")
        }
    }

    fun setPlayer(exoPlayer: ExoPlayer) {
        player?.removeListener(playerListener)
        player = exoPlayer
        playerView.player = exoPlayer
        exoPlayer.addListener(playerListener)
        startProgressUpdates()
        
        android.util.Log.d("ShakaPlayerView", "Player set, view size: ${width}x${height}")
    }
    
    fun getPlayer(): ExoPlayer? {
        return player
    }

    private val playerListener = object : Player.Listener {
        override fun onPlaybackStateChanged(playbackState: Int) {
            when (playbackState) {
                Player.STATE_READY -> {
                    sendEvent("onReady", Arguments.createMap().apply {
                        putDouble("duration", (player?.duration ?: 0) / 1000.0)
                    })
                    // Send buffering false when ready
                    sendEvent("onBuffer", Arguments.createMap().apply {
                        putBoolean("isBuffering", false)
                    })
                }
                Player.STATE_BUFFERING -> {
                    sendEvent("onBuffer", Arguments.createMap().apply {
                        putBoolean("isBuffering", true)
                    })
                }
                Player.STATE_ENDED -> {
                    sendEvent("onEnd", Arguments.createMap())
                }
                else -> {}
            }
        }

        override fun onIsPlayingChanged(isPlaying: Boolean) {
            if (isPlaying) {
                sendEvent("onPlay", Arguments.createMap())
            } else {
                sendEvent("onPause", Arguments.createMap())
            }
        }
        }

        override fun onPlayerError(error: PlaybackException) {
            sendEvent("onError", Arguments.createMap().apply {
                putString("error", error.message ?: "Unknown error")
            })
        }
    }

    private fun startProgressUpdates() {
        progressUpdateRunnable?.let { handler.removeCallbacks(it) }
        
        progressUpdateRunnable = object : Runnable {
            override fun run() {
                player?.let { p ->
                    if (p.isPlaying) {
                        sendEvent("onProgress", Arguments.createMap().apply {
                            putDouble("currentTime", p.currentPosition / 1000.0)
                            putDouble("duration", (p.duration.takeIf { it > 0 } ?: 0) / 1000.0)
                        })
                    }
                    handler.postDelayed(this, 250)
                }
            }
        }
        
        progressUpdateRunnable?.let { handler.post(it) }
    }

    private fun sendEvent(eventName: String, params: WritableMap) {
        val reactContext = context as? ReactContext ?: return
        reactContext
            .getJSModule(RCTEventEmitter::class.java)
            .receiveEvent(id, eventName, params)
    }

    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        progressUpdateRunnable?.let { handler.removeCallbacks(it) }
        player?.removeListener(playerListener)
    }
}
