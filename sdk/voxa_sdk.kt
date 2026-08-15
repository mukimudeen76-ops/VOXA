package in.voxaai.sdk

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

data class VoxaSdkConfig(
    val apiKey: String,
    val endpointUrl: String = "https://api.voxa.app",
    val enableNativeDsp: Boolean = true
)

class VoxaSdkClient(private val config: VoxaSdkConfig) {

    suspend fun initialize(): Boolean = withContext(Dispatchers.IO) {
        println("Initializing VOXA Kotlin SDK with API Key: ${config.apiKey.take(4)}****")
        true
    }

    suspend fun sendAudioFrame(pcmData: FloatArray): FloatArray = withContext(Dispatchers.Default) {
        // Process PCM frame via SDK
        pcmData
    }
}
