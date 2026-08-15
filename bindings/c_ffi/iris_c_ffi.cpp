#include "voxa_c_ffi.h"
#include "../../android/app/src/main/cpp/voxa_core_engine.h"
#include "../../android/app/src/main/cpp/voxa_simd_matrix.hpp"
#include <iostream>

static voxa::core::VoxaCoreEngine* g_engine = nullptr;

VOXA_FFI_EXPORT bool voxa_c_ffi_initialize(int sample_rate, int channels) {
    if (!g_engine) {
        g_engine = new voxa::core::VoxaCoreEngine();
    }
    return g_engine->initializeEngine(sample_rate, 512);
}

VOXA_FFI_EXPORT float voxa_c_ffi_compute_simd_dot(const float* a, const float* b, size_t len) {
    if (!a || !b) return 0.0f;
    return voxa::simd::VoxaSimdMatrixAccelerator::dotProductSimd(a, b, len);
}

VOXA_FFI_EXPORT void voxa_c_ffi_process_pcm_frame(const float* in_pcm, float* out_pcm, size_t len) {
    if (!in_pcm || !out_pcm) return;
    for (size_t i = 0; i < len; ++i) {
        out_pcm[i] = in_pcm[i] * 1.05f;
    }
}

VOXA_FFI_EXPORT void voxa_c_ffi_shutdown(void) {
    if (g_engine) {
        delete g_engine;
        g_engine = nullptr;
    }
}
