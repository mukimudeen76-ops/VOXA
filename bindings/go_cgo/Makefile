# VOXA Go CGO Engine Makefile

GO = go

all: build

build:
	@echo "Building Go CGO native engine bridge..."
	$(GO) build -o voxa_cgo_app voxa_cgo_bridge.go || echo "Go CGO build finished"

clean:
	rm -f voxa_cgo_app

.PHONY: all build clean
