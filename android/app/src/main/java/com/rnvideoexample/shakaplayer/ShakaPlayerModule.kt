package com.rnvideoexample.shakaplayer

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.module.annotations.ReactModule
import androidx.media3.exoplayer.ExoPlayer
import androidx.media3.common.MediaItem
import androidx.media3.common.Player
import java.util.concurrent.ConcurrentHashMap

@ReactModule(name = ShakaPlayerModule.NAME)
class ShakaPlayerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val players = ConcurrentHashMap<Int, ExoPlayer>()
    private val mainHandler = Handler(Looper.getMainLooper())

    override fun getName(): String {
        return NAME
    }

    fun registerPlayer(player: ExoPlayer, viewId: Int) {
        players[viewId] = player
        android.util.Log.d("ShakaPlayerModule", "Registered player for viewId: $viewId")
    }

    @ReactMethod
    fun createPlayer(viewId: Int) {
        // Player is created by the view, this just ensures compatibility
        android.util.Log.d("ShakaPlayerModule", "createPlayer called for viewId: $viewId")
    }

    @ReactMethod
    fun destroyPlayer(viewId: Int) {
        android.util.Log.d("ShakaPlayerModule", "destroyPlayer called for viewId: $viewId")
        val player = players.remove(viewId)
        mainHandler.post {
            player?.release()
        }
    }

    @ReactMethod
    fun loadVideo(viewId: Int, url: String) {
        android.util.Log.d("ShakaPlayerModule", "loadVideo called for viewId: $viewId, url: $url")
        val player = players[viewId]
        
        if (player == null) {
            android.util.Log.e("ShakaPlayerModule", "Player not found for viewId: $viewId. Available players: ${players.keys}")
            return
        }
        
        mainHandler.post {
            android.util.Log.d("ShakaPlayerModule", "Loading video on main thread")
            val mediaItem = MediaItem.fromUri(url)
            player.setMediaItem(mediaItem)
            player.prepare()
            android.util.Log.d("ShakaPlayerModule", "Video prepared")
        }
    }

    @ReactMethod
    fun play(viewId: Int) {
        val player = players[viewId] ?: return
        
        mainHandler.post {
            player.play()
        }
    }

    @ReactMethod
    fun pause(viewId: Int) {
        val player = players[viewId] ?: return
        
        mainHandler.post {
            player.pause()
        }
    }

    @ReactMethod
    fun seekTo(viewId: Int, position: Double) {
        val player = players[viewId] ?: return
        
        mainHandler.post {
            player.seekTo((position * 1000).toLong())
        }
    }

    @ReactMethod
    fun setVolume(viewId: Int, volume: Float) {
        val player = players[viewId] ?: return
        
        mainHandler.post {
            player.volume = volume
        }
    }

    @ReactMethod
    fun getCurrentPosition(viewId: Int, promise: Promise) {
        val player = players[viewId]
        if (player == null) {
            promise.reject("ERROR", "Player not found")
            return
        }
        
        mainHandler.post {
            val position = player.currentPosition / 1000.0
            promise.resolve(position)
        }
    }

    @ReactMethod
    fun getDuration(viewId: Int, promise: Promise) {
        val player = players[viewId]
        if (player == null) {
            promise.reject("ERROR", "Player not found")
            return
        }
        
        mainHandler.post {
            val duration = if (player.duration > 0) player.duration / 1000.0 else 0.0
            promise.resolve(duration)
        }
    }

    @ReactMethod
    fun getIsPlaying(viewId: Int, promise: Promise) {
        val player = players[viewId]
        if (player == null) {
            promise.reject("ERROR", "Player not found")
            return
        }
        
        mainHandler.post {
            promise.resolve(player.isPlaying)
        }
    }

    companion object {
        const val NAME = "ShakaPlayerModule"
    }
}
