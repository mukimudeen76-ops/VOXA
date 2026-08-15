{
  "targets": [
    {
      "target_name": "voxa_node_addon",
      "sources": [
        "voxa_node_addon.cpp",
        "../../android/app/src/main/cpp/voxa_core_engine.cpp",
        "../../android/app/src/main/cpp/voxa_simd_matrix.cpp"
      ],
      "include_dirs": [
        "../../android/app/src/main/cpp"
      ],
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ]
    }
  ]
}
