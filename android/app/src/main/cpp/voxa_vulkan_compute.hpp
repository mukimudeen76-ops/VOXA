#ifndef VOXA_VULKAN_COMPUTE_HPP
#define VOXA_VULKAN_COMPUTE_HPP

#include <vector>
#include <cstdint>
#include <string>

namespace voxa {
namespace gpu {

struct VulkanDeviceInfo {
    std::string deviceName;
    uint32_t apiVersion;
    uint64_t maxStorageBufferBytes;
    bool isDiscreteGpu;
};

class VoxaVulkanComputePipeline {
public:
    VoxaVulkanComputePipeline();
    ~VoxaVulkanComputePipeline();

    bool initializeVulkanContext();
    VulkanDeviceInfo getDeviceInfo();
    void executeMatrixVectorMultiply(const float* inputMatrix, const float* vectorIn, float* vectorOut, int rows, int cols);
    void releaseVulkanResources();

private:
    bool m_initialized;
    VulkanDeviceInfo m_deviceInfo;
};

} // namespace gpu
} // namespace voxa

#endif // VOXA_VULKAN_COMPUTE_HPP
