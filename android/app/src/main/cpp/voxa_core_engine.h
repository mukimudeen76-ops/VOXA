#ifndef VOXA_CORE_ENGINE_H
#define VOXA_CORE_ENGINE_H

#include <vector>
#include <cmath>
#include <cstdint>
#include <string>
#include <chrono>

namespace voxa {
namespace core {

struct SignalFrame {
    std::vector<float> spectrumData;
    float peakAmplitude;
    float rmsEnergy;
    float quantumCoherence;
    uint64_t timestampNs;
};

struct EngineMetrics {
    double cpuLoadPercentage;
    uint64_t totalAllocatedBytes;
    uint64_t processedFrameCount;
    float meanInferenceLatencyMs;
};

class VoxaCoreEngine {
public:
    VoxaCoreEngine();
    ~VoxaCoreEngine();

    void initializeEngine(int sampleRate, int fftSize);
    SignalFrame processAudioBuffer(const float* rawSamples, size_t sampleCount);
    void computeMatrixTransform(const float* inputMatrix, float* outputMatrix, int rows, int cols);
    EngineMetrics getMetrics();
    void resetState();

private:
    int m_sampleRate;
    int m_fftSize;
    uint64_t m_frameCount;
    uint64_t m_totalAllocatedMemory;
    std::chrono::high_resolution_clock::time_point m_startTime;

    void applyHammingWindow(float* buffer, size_t size);
    void computeFFT(float* real, float* imag, size_t size);
};

} // namespace core
} // namespace voxa

#endif // VOXA_CORE_ENGINE_H
