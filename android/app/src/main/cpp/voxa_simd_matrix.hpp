#ifndef VOXA_SIMD_MATRIX_HPP
#define VOXA_SIMD_MATRIX_HPP

#include <cstddef>

namespace voxa {
namespace simd {

class VoxaSimdMatrixAccelerator {
public:
    static float dotProductSimd(const float* vecA, const float* vecB, size_t length);
    static void matrixVectorMultiplySimd(const float* matrix, const float* vecIn, float* vecOut, size_t rows, size_t cols);
};

} // namespace simd
} // namespace voxa

#endif // VOXA_SIMD_MATRIX_HPP
