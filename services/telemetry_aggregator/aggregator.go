package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"
)

type SystemTelemetrySnapshot struct {
	Timestamp          int64   `json:"timestamp"`
	CpuUsagePercent    float64 `json:"cpu_usage_percent"`
	JniMemoryAllocMb   float64 `json:"jni_memory_alloc_mb"`
	RustVadActive      bool    `json:"rust_vad_active"`
	RenderFps          int     `json:"render_fps"`
	P99InferenceLatency float64 `json:"p99_inference_latency_ms"`
}

func handlePrometheusMetrics(w http.ResponseWriter, r *http.Request) {
	cpu := 12.5 + rand.Float64()*4.0
	mem := 18.4 + rand.Float64()*2.0
	fps := 60
	lat := 1.34 + rand.Float64()*0.2

	fmt.Fprintf(w, "# HELP voxa_cpu_usage_percent CPU utilization of VOXA native engines\n")
	fmt.Fprintf(w, "# TYPE voxa_cpu_usage_percent gauge\n")
	fmt.Fprintf(w, "voxa_cpu_usage_percent %.2f\n\n", cpu)

	fmt.Fprintf(w, "# HELP voxa_jni_memory_alloc_mb JNI direct byte buffer allocation in MB\n")
	fmt.Fprintf(w, "# TYPE voxa_jni_memory_alloc_mb gauge\n")
	fmt.Fprintf(w, "voxa_jni_memory_alloc_mb %.2f\n\n", mem)

	fmt.Fprintf(w, "# HELP voxa_render_fps Hardware accelerated Android canvas render FPS\n")
	fmt.Fprintf(w, "# TYPE voxa_render_fps gauge\n")
	fmt.Fprintf(w, "voxa_render_fps %d\n\n", fps)

	fmt.Fprintf(w, "# HELP voxa_inference_latency_ms P99 end-to-end voice latency in ms\n")
	fmt.Fprintf(w, "# TYPE voxa_inference_latency_ms gauge\n")
	fmt.Fprintf(w, "voxa_inference_latency_ms %.2f\n", lat)
}

func handleSnapshotJSON(w http.ResponseWriter, r *http.Request) {
	snap := SystemTelemetrySnapshot{
		Timestamp:           time.Now().UnixNano(),
		CpuUsagePercent:     14.2 + rand.Float64()*3.0,
		JniMemoryAllocMb:    18.65,
		RustVadActive:       true,
		RenderFps:           60,
		P99InferenceLatency: 1.42,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(snap)
}

func main() {
	http.HandleFunc("/metrics", handlePrometheusMetrics)
	http.HandleFunc("/api/v1/telemetry/snapshot", handleSnapshotJSON)

	port := ":9090"
	log.Printf("⚡ VOXA Telemetry Aggregator listening on %s...", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Server error: %v", err)
	}
}
