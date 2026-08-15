import Foundation
import AVFoundation

public class VoxaAudioRecorder: NSObject {
    private var audioRecorder: AVAudioRecorder?
    private var isRecording: Bool = false

    public override init() {
        super.init()
    }

    public func startRecording() -> Bool {
        let settings: [String: Any] = [
            AVFormatIDKey: kAudioFormatLinearPCM,
            AVSampleRateKey: 44100.0,
            AVNumberOfChannelsKey: 1,
            AVLinearPCMBitDepthKey: 16,
            AVLinearPCMIsFloatKey: false
        ]

        let url = FileManager.default.temporaryDirectory.appendingPathComponent("voxa_record.pcm")
        do {
            audioRecorder = try AVAudioRecorder(url: url, settings: settings)
            audioRecorder?.record()
            isRecording = true
            print("[VoxaAudioRecorder] Recording started at \(url.path)")
            return true
        } catch {
            print("[VoxaAudioRecorder] Error starting recorder: \(error)")
            return false
        }
    }

    public func stopRecording() {
        audioRecorder?.stop()
        isRecording = false
        print("[VoxaAudioRecorder] Recording stopped")
    }
}
