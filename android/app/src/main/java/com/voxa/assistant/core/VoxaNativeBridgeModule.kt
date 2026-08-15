package com.voxa.assistant.core

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class VoxaNativeBridgeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "VoxaNativeBridgeModule"

    @ReactMethod
    fun getNativeSystemStatus(promise: Promise) {
        promise.resolve("VOXA_KOTLIN_DSP_ENGINE_ACTIVE")
    }
}
