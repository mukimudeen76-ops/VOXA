#ifndef VOXA_C_FFI_H
#define VOXA_C_FFI_H

#include <stddef.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

#if defined(_WIN32)
  #define VOXA_FFI_EXPORT __declspec(dllexport)
#else
  #define VOXA_FFI_EXPORT __attribute__((visibility("default")))
#endif

VOXA_FFI_EXPORT bool voxa_c_ffi_initialize(int sample_rate, int channels);
VOXA_FFI_EXPORT float voxa_c_ffi_compute_simd_dot(const float* a, const float* b, size_t len);
VOXA_FFI_EXPORT void voxa_c_ffi_process_pcm_frame(const float* in_pcm, float* out_pcm, size_t len);
VOXA_FFI_EXPORT void voxa_c_ffi_shutdown(void);

#ifdef __cplusplus
}
#endif

#endif // VOXA_C_FFI_H
