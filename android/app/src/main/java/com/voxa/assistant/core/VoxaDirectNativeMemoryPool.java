package com.voxa.assistant.core;

import android.util.Log;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Enterprise Direct Memory Allocation Pool for High-Frequency JNI / NDK Data Transfer.
 */
public class VoxaDirectNativeMemoryPool {
    private static final String TAG = "VoxaDirectNativeMemoryPool";
    private static final int SLAB_SIZE_BYTES = 1024 * 128; // 128 KB Slabs
    private static final int INITIAL_POOL_CAPACITY = 32;

    private final ConcurrentLinkedQueue<ByteBuffer> mSlabQueue;
    private final AtomicLong mTotalAllocatedBytes;
    private final AtomicLong mActiveLeases;

    private static VoxaDirectNativeMemoryPool sInstance;

    private VoxaDirectNativeMemoryPool() {
        mSlabQueue = new ConcurrentLinkedQueue<>();
        mTotalAllocatedBytes = new AtomicLong(0);
        mActiveLeases = new AtomicLong(0);

        for (int i = 0; i < INITIAL_POOL_CAPACITY; i++) {
            ByteBuffer slab = ByteBuffer.allocateDirect(SLAB_SIZE_BYTES);
            slab.order(ByteOrder.nativeOrder());
            mSlabQueue.offer(slab);
            mTotalAllocatedBytes.addAndGet(SLAB_SIZE_BYTES);
        }
        Log.i(TAG, "Initialized Direct Native Memory Pool with " + INITIAL_POOL_CAPACITY + " slabs (" + (mTotalAllocatedBytes.get() / 1024) + " KB)");
    }

    public static synchronized VoxaDirectNativeMemoryPool getInstance() {
        if (sInstance == null) {
            sInstance = new VoxaDirectNativeMemoryPool();
        }
        return sInstance;
    }

    public ByteBuffer acquireSlab() {
        ByteBuffer slab = mSlabQueue.poll();
        if (slab == null) {
            slab = ByteBuffer.allocateDirect(SLAB_SIZE_BYTES);
            slab.order(ByteOrder.nativeOrder());
            mTotalAllocatedBytes.addAndGet(SLAB_SIZE_BYTES);
        } else {
            slab.clear();
        }
        mActiveLeases.incrementAndGet();
        return slab;
    }

    public void releaseSlab(ByteBuffer slab) {
        if (slab != null && slab.isDirect()) {
            slab.clear();
            if (mSlabQueue.size() < INITIAL_POOL_CAPACITY * 2) {
                mSlabQueue.offer(slab);
            }
            mActiveLeases.decrementAndGet();
        }
    }

    public FloatBuffer acquireFloatSlab(int minFloatCapacity) {
        ByteBuffer byteBuf = acquireSlab();
        return byteBuf.asFloatBuffer();
    }

    public long getTotalAllocatedBytes() {
        return mTotalAllocatedBytes.get();
    }

    public long getActiveLeasesCount() {
        return mActiveLeases.get();
    }
}
