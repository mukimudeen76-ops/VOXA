import importlib
import importlib.util
from setuptools import setup, Extension

pybind11_spec = importlib.util.find_spec("pybind11")
if pybind11_spec is not None:
    pybind11 = importlib.import_module("pybind11")
    pybind_include = pybind11.get_include()
else:
    pybind_include = "../../android/app/src/main/cpp"

ext_modules = [
    Extension(
        "voxa_native_py",
        [
            "voxa_native_py.cpp",
            "../../android/app/src/main/cpp/voxa_core_engine.cpp",
            "../../android/app/src/main/cpp/voxa_simd_matrix.cpp",
            "../../android/app/src/main/cpp/voxa_conformer_encoder.cpp",
        ],
        include_dirs=[
            pybind_include,
            "../../android/app/src/main/cpp",
        ],
        language="c++",
        extra_compile_args=["-std=c++17", "-O3"],
    ),
]

setup(
    name="voxa_native_py",
    version="2.4.0",
    author="VOXA AI Platform",
    description="Python C++ bindings for low-latency native engine",
    ext_modules=ext_modules if pybind11_spec is not None else [],
)
