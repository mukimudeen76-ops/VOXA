import Foundation

@objc(VoxaNativeBridge)
public class VoxaNativeBridge: NSObject {

    @objc public func startEngine(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        print("[VoxaNativeBridge] Native iOS Engine Started")
        resolve(true)
    }

    @objc public static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
