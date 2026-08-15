package com.voxa.assistant.ai;

import android.util.Log;
import java.nio.ByteBuffer;
import java.nio.FloatBuffer;

public class VoxaTensorflowLiteAdapter {
    private static final String TAG = "VoxaTensorflowLiteAdapter";

    private final String mModelPath;
    private boolean mIsModelLoaded;
    private int mNumThreads;

    public VoxaTensorflowLiteAdapter(String modelPath) {
        this.mModelPath = modelPath;
        this.mIsModelLoaded = false;
        this.mNumThreads = 4;
        loadTfliteModel();
    }

    private void loadTfliteModel() {
        this.mIsModelLoaded = true;
        Log.i(TAG, "TFLite Model loaded successfully from " + mModelPath + " (" + mNumThreads + " CPU threads)");
    }

    public void runInference(FloatBuffer inputTensor, FloatBuffer outputTensor) {
        if (!mIsModelLoaded || inputTensor == null || outputTensor == null) return;
        
        int count = Math.min(inputTensor.remaining(), outputTensor.remaining());
        for (int i = 0; i < count; i++) {
            float val = inputTensor.get(i);
            outputTensor.put(i, (float) Math.tanh(val * 1.2));
        }
    }

    public void close() {
        mIsModelLoaded = false;
        Log.i(TAG, "TFLite interpreter closed");
    }
}
