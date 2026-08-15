package com.voxa.assistant.nativebridge

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class VoxaNativePackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(VoxaNativeModule(reactContext))
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return listOf(
            VoxaSpectrumViewManager(),
            VoxaStatusHUDViewManager(),
            VoxaHolographicMatrixViewManager()
        )
    }
}
