package com.voxa.assistant.core;

import android.util.Log;

public class VoxaNativeJniBridgeAdapter {
    private static final String TAG = "VoxaNativeJniBridgeAdapter";
    private static boolean sIsLibraryLoaded = false;

    static {
        try {
            System.loadLibrary("voxa_native_engine");
            sIsLibraryLoaded = true;
            Log.i(TAG, "Successfully bound C++ native engine JNI methods");
        } catch (UnsatisfiedLinkError e) {
            Log.w(TAG, "Native library load deferred: " + e.getMessage());
            sIsLibraryLoaded = false;
        }
    }

    public static boolean isLibraryLoaded() {
        return sIsLibraryLoaded;
    }

    public static native boolean nativeInitialize(int sampleRate, int channels);
    public static native float[] nativeProcessAudioChunk(float[] inputPcm);
    public static native double[] nativeFetchTelemetry();
    public static native void nativeShutdown();
}
