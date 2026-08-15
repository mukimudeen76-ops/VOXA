#ifndef VOXA_FILTERBANK_H
#define VOXA_FILTERBANK_H

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

void voxa_c_filterbank_apply(const float* spectrum, float* mel_bands, size_t fft_bins, size_t mel_bins);

#ifdef __cplusplus
}
#endif

#endif // VOXA_FILTERBANK_H
