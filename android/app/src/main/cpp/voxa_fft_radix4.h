#ifndef VOXA_FFT_RADIX4_H
#define VOXA_FFT_RADIX4_H

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

void voxa_c_radix4_fft(float* real, float* imag, size_t length);
void voxa_c_power_spectrum(const float* real, const float* imag, float* power, size_t length);

#ifdef __cplusplus
}
#endif

#endif // VOXA_FFT_RADIX4_H
