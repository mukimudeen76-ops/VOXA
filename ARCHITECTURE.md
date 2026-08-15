# ⚡ VOXA Technical Architecture

VOXA is built on a **multi-language, low-latency, zero-copy native signal processing architecture** optimized for real-time voice interaction, neural intent evaluation, and hardware-accelerated spectrum rendering.

```
                  ┌────────────────────────────────────────────────────────┐
                  │                 React Native / Expo                    │
                  │             (UI & User Experience Layer)               │
                  └──────────────────────────┬─────────────────────────────┘
                                             │  Bridge & JNI
                  ┌──────────────────────────┴─────────────────────────────┐
                  │          Kotlin Native Controllers & Android UI        │
                  │ (VoxaNativeEngine, Spectrum Canvas View, Telemetry HUD)│
                  └──────┬───────────────────┬───────────────────┬─────────┘
                         │                   │                   │
      ┌──────────────────┴──────┐ ┌──────────┴──────────┐ ┌─────┴──────────────────┐
      │ C++ NDK Engine (JNI)    │ │ Rust Audio Core     │ │ Go Voice Gateway        │
      │ • FFT & Matrix Vector   │ │ • SIMD VAD          │ │ • Real-Time WebSockets  │
      │ • Beam Search ASR       │ │ • Mel Filterbanks   │ │ • gRPC Event Broadcast  │
      └─────────────────────────┘ └─────────────────────┘ └─────────────────────────┘
```

---

## 🛠️ Multi-Language Module Directory Structure

| Language | Folder / File Path | Responsibility |
| :--- | :--- | :--- |
| **Kotlin** | `android/app/src/main/java/com/voxa/assistant/core/VoxaNativeEngine.kt` | JNI Lifecycle, Coroutines, StateFlow Audio Spectrum |
| **Kotlin** | `android/app/src/main/java/com/voxa/assistant/ui/views/VoxaNativeSpectrumView.kt` | Custom Android Canvas hardware-accelerated audio spectrum visualizer |
| **Kotlin** | `android/app/src/main/java/com/voxa/assistant/ui/views/VoxaNativeStatusHUDView.kt` | Custom Android Canvas Telemetry HUD (FPS, C++ Heap, CPU, Latency) |
| **Kotlin** | `android/app/src/main/java/com/voxa/assistant/audio/VoxaAcousticStreamer.kt` | AudioRecord PCM ring-buffer capture & acoustic noise suppression |
| **Java** | `android/app/src/main/java/com/voxa/assistant/core/VoxaTensorBufferManager.java` | Zero-copy `DirectByteBuffer` memory slab pool |
| **Java** | `android/app/src/main/java/com/voxa/assistant/security/VoxaBiometricVoiceAuth.java` | SHA-256 Speaker Voiceprint authentication & zero-trust verifier |
| **C++** | `android/app/src/main/cpp/voxa_core_engine.cpp` | Multi-threaded FFT signal processing & matrix transformations |
| **C++** | `core_engine/cpp/voxa_acoustic_model.cpp` | Streaming Conformer ASR ONNX acoustic model inference |
| **Rust** | `core_engine/src/lib.rs` | SIMD Voice Activity Detection (VAD) & Mel-filterbank computation |
| **Go** | `services/voice_gateway/main.go` | Concurrent WebSocket & gRPC telemetry & audio streaming server |
| **Python** | `scripts/train_acoustic_model.py` | PyTorch Conformer-CTC ASR model training & quantization exporter |
| **Python** | `scripts/benchmark_latency.py` | Async P99 latency benchmark tool measuring voice pipeline performance |
| **Protobuf** | `proto/voxa_speech_event.proto` | Binary serialization schema for audio frames & neural intents |
| **TOML** | `voxa_engine_config.toml` | Root engine operational parameters, thread affinity & model paths |

---

## ⚡ Performance Specifications
- **Target Pipeline Latency**: `< 15ms`
- **Memory Overhead**: Fixed `64MB` Direct Memory Pool
- **Audio Capture**: `44.1 kHz 16-bit PCM Mono`
- **GPU Acceleration**: Android Hardware Canvas Layer with double-buffering