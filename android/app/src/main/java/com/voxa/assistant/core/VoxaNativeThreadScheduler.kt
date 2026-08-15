package com.voxa.assistant.core

import android.os.Process
import android.util.Log

object VoxaNativeThreadScheduler {
    private const val TAG = "VoxaNativeThreadScheduler"

    fun setThreadPriorityRealtimeAudio() {
        try {
            Process.setThreadPriority(Process.THREAD_PRIORITY_URGENT_AUDIO)
            Log.i(TAG, "Audio thread set to THREAD_PRIORITY_URGENT_AUDIO (-19)")
        } catch (e: Exception) {
            Log.w(TAG, "Could not set realtime audio priority", e)
        }
    }

    fun setThreadPriorityNeuralInference() {
        try {
            Process.setThreadPriority(Process.THREAD_PRIORITY_DISPLAY)
            Log.i(TAG, "Inference thread priority set to THREAD_PRIORITY_DISPLAY (-4)")
        } catch (e: Exception) {
            Log.w(TAG, "Could not set inference thread priority", e)
        }
    }
}
