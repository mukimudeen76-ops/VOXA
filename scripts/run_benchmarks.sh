#!/usr/bin/env bash
# VOXA Comprehensive Latency Benchmark Suite

echo "========================================================="
echo "📊 RUNNING VOXA MULTI-ENGINE LATENCY BENCHMARKS"
echo "========================================================="

echo "› Running Python Latency Benchmark..."
python scripts/benchmark_latency.py

echo "› Running Model Perplexity Evaluation..."
python scripts/eval_perplexity.py

echo "========================================================="
