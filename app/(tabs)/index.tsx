import VoxaBiometricScanner from "@/components/VoxaBiometricScanner";
import VoxaHeader from "@/components/VoxaHeader";
import VoxaHolographicOrb from "@/components/VoxaHolographicOrb";
import VoxaNativeVisualizer from "@/components/VoxaNativeVisualizer";
import VoxaQuantumHUD from "@/components/VoxaQuantumHUD";
import VoxaVoiceNode from "@/components/VoxaVoiceNode";
import { styled } from "nativewind";
import { ScrollView } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-black p-5">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <VoxaHeader />
        <VoxaHolographicOrb />
        <VoxaVoiceNode />
        <VoxaBiometricScanner />
        <VoxaNativeVisualizer />
        <VoxaQuantumHUD />
      </ScrollView>
    </SafeAreaView>
  );
}
