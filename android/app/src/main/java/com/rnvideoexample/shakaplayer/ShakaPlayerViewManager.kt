package com.rnvideoexample.shakaplayer

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.common.MapBuilder
import androidx.media3.exoplayer.ExoPlayer

class ShakaPlayerViewManager(
    private val reactContext: ReactApplicationContext
) : SimpleViewManager<ShakaPlayerView>() {

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): ShakaPlayerView {
        val view = ShakaPlayerView(reactContext)
        
        // Create player and it will be registered when view is attached
        val player = ExoPlayer.Builder(reactContext).build()
        view.setPlayer(player)
        
        return view
    }
    
    override fun addEventEmitters(reactContext: ThemedReactContext, view: ShakaPlayerView) {
        super.addEventEmitters(reactContext, view)
        
        // Use the actual React tag as viewId
        view.viewId = view.id
        
        // Register the player with the module using the React view ID
        val player = view.getPlayer()
        if (player != null) {
            val module = this.reactContext.getNativeModule(ShakaPlayerModule::class.java)
            module?.registerPlayer(player, view.id)
            android.util.Log.d("ShakaPlayerViewManager", "Registered player for viewId: ${view.id}")
        } else {
            android.util.Log.e("ShakaPlayerViewManager", "Player is null when trying to register for viewId: ${view.id}")
        }
    }

    override fun onDropViewInstance(view: ShakaPlayerView) {
        super.onDropViewInstance(view)
        
        val module = reactContext.getNativeModule(ShakaPlayerModule::class.java)
        module?.destroyPlayer(view.id)
    }

    override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any> {
        return MapBuilder.builder<String, Any>()
            .put("onReady", MapBuilder.of("registrationName", "onReady"))
            .put("onPlay", MapBuilder.of("registrationName", "onPlay"))
            .put("onPause", MapBuilder.of("registrationName", "onPause"))
            .put("onBuffer", MapBuilder.of("registrationName", "onBuffer"))
            .put("onError", MapBuilder.of("registrationName", "onError"))
            .put("onProgress", MapBuilder.of("registrationName", "onProgress"))
            .put("onEnd", MapBuilder.of("registrationName", "onEnd"))
            .build()
    }

    companion object {
        private const val REACT_CLASS = "ShakaPlayerView"
    }
}

