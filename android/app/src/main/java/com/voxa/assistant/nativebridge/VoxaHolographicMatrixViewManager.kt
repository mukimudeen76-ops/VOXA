package com.voxa.assistant.nativebridge

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.voxa.assistant.ui.views.VoxaNativeHolographicMatrixView

class VoxaHolographicMatrixViewManager : SimpleViewManager<VoxaNativeHolographicMatrixView>() {

    override fun getName(): String {
        return "VoxaNativeHolographicMatrixView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): VoxaNativeHolographicMatrixView {
        return VoxaNativeHolographicMatrixView(reactContext)
    }
}
