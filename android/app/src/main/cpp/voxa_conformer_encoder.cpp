#include "voxa_conformer_encoder.hpp"
#include <cmath>
#include <algorithm>
#include <android/log.h>

#define LOG_TAG "VoxaConformerEncoder"
#define LOGI(...) __android_log_print(ANDROID_LOG_INFO, LOG_TAG, __VA_ARGS__)

namespace voxa {
namespace speech {

VoxaConformerEncoder::VoxaConformerEncoder(int dModel, int numHeads, int kernelSize)
    : m_dModel(dModel), m_numHeads(numHeads), m_kernelSize(kernelSize) {
    LOGI("Conformer Encoder initialized: dModel=%d, heads=%d, kernel=%d", dModel, numHeads, kernelSize);
}

VoxaConformerEncoder::~VoxaConformerEncoder() {}

void VoxaConformerEncoder::applyFeedForwardLayer(float* data, size_t size) {
    for (size_t i = 0; i < size; ++i) {
        float val = data[i];
        float silu = val / (1.0f + std::exp(-val)); // SiLU activation
        data[i] = silu;
    }
}

std::vector<float> VoxaConformerEncoder::forward(const std::vector<float>& inputMelFrames, int seqLen) {
    std::vector<float> output = inputMelFrames;
    applyFeedForwardLayer(output.data(), output.size());
    return output;
}

} // namespace speech
} // namespace voxa
