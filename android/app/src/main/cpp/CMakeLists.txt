cmake_minimum_required(VERSION 3.22.1)
project("voxa_native_engine")

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_library(
    voxa_native_engine
    SHARED
    voxa_core_engine.cpp
    voxa_jni_bridge.cpp
    voxa_simd_matrix.cpp
    voxa_vulkan_compute.cpp
    voxa_audio_resampler.cpp
    voxa_tensor_math.cpp
    voxa_conformer_encoder.cpp
    voxa_beam_search_decoder.cpp
    voxa_quantized_matmul.cpp
    voxa_tensor_operations.cpp
    voxa_audio_dsp_kernel.cpp
    raw_c_dsp.c
    voxa_fft_radix4.c
    voxa_filterbank.c
)

find_library(
    log-lib
    log
)

target_link_libraries(
    voxa_native_engine
    ${log-lib}
)
