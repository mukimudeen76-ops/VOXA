package main

import (
	"fmt"
	"net/http"
)

func ServePrometheusMetrics(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "# HELP voxa_active_voice_sessions Number of active binary voice streams\n")
	fmt.Fprintf(w, "# TYPE voxa_active_voice_sessions gauge\n")
	fmt.Fprintf(w, "voxa_active_voice_sessions 12\n")
}
