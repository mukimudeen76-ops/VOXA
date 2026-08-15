package com.voxa.assistant.nativebridge

import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.voxa.assistant.ui.views.VoxaNativeStatusHUDView

class VoxaStatusHUDViewManager : SimpleViewManager<VoxaNativeStatusHUDView>() {

    override fun getName(): String {
        return "VoxaNativeStatusHUDView"
    }

    override fun createViewInstance(reactContext: ThemedReactContext): VoxaNativeStatusHUDView {
        return VoxaNativeStatusHUDView(reactContext)
    }
}
