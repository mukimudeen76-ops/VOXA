#include <vector>
#include <iostream>

namespace voxa {
namespace dsp {

class VoxaAudioPipeline {
public:
    VoxaAudioPipeline() {}

    void processBuffer(float* buffer, size_t size) {
        for (size_t i = 0; i < size; ++i) {
            buffer[i] *= 1.2f; // Apply gain
        }
    }
};

} // namespace dsp
} // namespace voxa
