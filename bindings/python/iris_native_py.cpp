#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include "../../android/app/src/main/cpp/voxa_core_engine.h"
#include "../../android/app/src/main/cpp/voxa_simd_matrix.hpp"
#include "../../android/app/src/main/cpp/voxa_conformer_encoder.hpp"

namespace py = pybind11;

PYBIND11_MODULE(voxa_native_py, m) {
    m.doc() = "VOXA Low-Latency Native C++ Engine Python Bindings";

    py::class_<voxa::core::VoxaCoreEngine>(m, "VoxaCoreEngine")
        .def(py::init<>())
        .def("initialize_engine", &voxa::core::VoxaCoreEngine::initializeEngine)
        .def("reset_state", &voxa::core::VoxaCoreEngine::resetState);

    py::class_<voxa::speech::VoxaConformerEncoder>(m, "VoxaConformerEncoder")
        .def(py::init<int, int, int>(), py::arg("dModel") = 256, py::arg("numHeads") = 4, py::arg("kernelSize") = 31)
        .def("forward", &voxa::speech::VoxaConformerEncoder::forward);

    m.def("simd_dot_product", [](const std::vector<float>& a, const std::vector<float>& b) {
        if (a.size() != b.size()) throw std::runtime_error("Vector sizes must match");
        return voxa::simd::VoxaSimdMatrixAccelerator::dotProductSimd(a.data(), b.data(), a.size());
    }, "Compute SIMD accelerated vector dot product");
}
