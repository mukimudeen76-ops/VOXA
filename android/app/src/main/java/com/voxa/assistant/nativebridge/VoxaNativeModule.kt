package com.voxa.assistant.nativebridge

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.voxa.assistant.core.VoxaNativeEngine

class VoxaNativeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "VoxaNativeModule"
    }

    @ReactMethod
    fun startNativeEngine(promise: Promise) {
        try {
            VoxaNativeEngine.startNativeLoop()
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERR_ENGINE_START", e.message, e)
        }
    }

    @ReactMethod
    fun stopNativeEngine(promise: Promise) {
        try {
            VoxaNativeEngine.stopNativeLoop()
            promise.resolve(true)
        } catch (e: Exception) {
            promise.reject("ERR_ENGINE_STOP", e.message, e)
        }
    }

    @ReactMethod
    fun getTelemetryData(promise: Promise) {
        try {
            val telem = VoxaNativeEngine.telemetryFlow.value
            val map = Arguments.createMap().apply {
                putDouble("cpuLoad", telem.cpuLoad)
                putDouble("allocatedBytes", telem.allocatedBytes.toDouble())
                putDouble("processedFrames", telem.processedFrames.toDouble())
                putDouble("inferenceLatencyMs", telem.inferenceLatencyMs)
            }
            promise.resolve(map)
        } catch (e: Exception) {
            promise.reject("ERR_TELEMETRY", e.message, e)
        }
    }
}
