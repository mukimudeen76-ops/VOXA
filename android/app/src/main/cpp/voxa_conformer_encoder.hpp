#ifndef VOXA_CONFORMER_ENCODER_HPP
#define VOXA_CONFORMER_ENCODER_HPP

#include <vector>
#include <memory>

namespace voxa {
namespace speech {

class VoxaConformerEncoder {
public:
    VoxaConformerEncoder(int dModel = 256, int numHeads = 4, int kernelSize = 31);
    ~VoxaConformerEncoder();

    std::vector<float> forward(const std::vector<float>& inputMelFrames, int seqLen);
    void applyFeedForwardLayer(float* data, size_t size);

private:
    int m_dModel;
    int m_numHeads;
    int m_kernelSize;
};

} // namespace speech
} // namespace voxa

#endif // VOXA_CONFORMER_ENCODER_HPP
