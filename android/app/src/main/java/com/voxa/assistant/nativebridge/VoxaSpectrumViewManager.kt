package com.voxa.assistant.nativebridge

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.voxa.assistant.ui.views.VoxaNativeSpectrumView

class VoxaSpectrumViewManager : SimpleViewManager<VoxaNativeSpectrumView>() {

    override fun getName(): String {
        return "VoxaNativeSpectrumView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): VoxaNativeSpectrumView {
        return VoxaNativeSpectrumView(reactContext)
    }
}
