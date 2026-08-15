package com.voxa.assistant.core

import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.SharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.launch

sealed class VoxaNativeEvent {
    data class AudioSpectrumUpdated(val peakRms: Float, val bands: FloatArray) : VoxaNativeEvent()
    data class NeuralIntentDetected(val intent: String, val confidence: Float) : VoxaNativeEvent()
    data class TelemetryLogged(val cpuUsage: Double, val heapMb: Double) : VoxaNativeEvent()
}

object VoxaEventBusChannel {
    private val scope = CoroutineScope(Dispatchers.Default + SupervisorJob())

    private val _eventFlow = MutableSharedFlow<VoxaNativeEvent>(replay = 1)
    val eventFlow: SharedFlow<VoxaNativeEvent> = _eventFlow.asSharedFlow()

    fun postEvent(event: VoxaNativeEvent) {
        scope.launch {
            _eventFlow.emit(event)
        }
    }
}
