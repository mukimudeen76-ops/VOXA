import { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VOXA_VOICES } from "../../constants/persona";

const voiceOptions = [
  VOXA_VOICES.maleDefault,   // Puck (default male)
  VOXA_VOICES.maleAlt,       // Fenrir
  VOXA_VOICES.femaleOptionA, // Aoede
  VOXA_VOICES.femaleOptionB, // Kore
];

export default function SettingsScreen() {
  const [overlays, setOverlays] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [microphone, setMicrophone] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>(VOXA_VOICES.maleDefault);

  const ToggleRow = ({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (v: boolean) => void }) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#22223a", true: "#A855F7" }}
        thumbColor={value ? "#22D3EE" : "#666"}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>⚙️ VOXA SETTINGS</Text>
        <Text style={styles.subtitle}>Permissions, voice & persona controls.</Text>

        {/* Permissions */}
        <Text style={styles.section}>🔒 PERMISSIONS</Text>
        <View style={styles.card}>
          <ToggleRow label="Floating Overlay" value={overlays} onValueChange={setOverlays} />
          <ToggleRow label="Notification Listener" value={notifications} onValueChange={setNotifications} />
          <ToggleRow label="Microphone Access" value={microphone} onValueChange={setMicrophone} />
        </View>

        {/* Voice selection */}
        <Text style={styles.section}>🎙️ VOICE (AWAZ)</Text>
        <View style={styles.card}>
          {voiceOptions.map((v) => {
            const active = selectedVoice === v;
            return (
              <TouchableOpacity key={v} style={[styles.voiceRow, active && styles.voiceRowActive]} onPress={() => setSelectedVoice(v)}>
                <Text style={[styles.voiceName, active && { color: "#22D3EE" }]}>{v}</Text>
                <Text style={styles.voiceBadge}>{active ? "✓ SELECTED" : ""}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.note}>
          API Key is stored securely on-device (BYOK) and never leaves your device.
        </Text>
        <Text style={styles.note}>
          Persona: sassy Hinglish · Level 1000+ Sovereign · Default voice: {selectedVoice}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#22D3EE", fontSize: 16, fontWeight: "bold", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 },
  subtitle: { color: "#8a8ab0", fontSize: 12, fontFamily: "monospace", marginBottom: 18 },
  section: { color: "#A855F7", fontSize: 12, fontWeight: "bold", fontFamily: "monospace", marginTop: 14, marginBottom: 8, letterSpacing: 1 },
  card: { borderRadius: 14, backgroundColor: "#0A0714", padding: 6, borderWidth: 1, borderColor: "#1c1c34" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 },
  rowLabel: { color: "#fff", fontSize: 14, fontFamily: "monospace" },
  voiceRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14, borderRadius: 8, marginVertical: 2 },
  voiceRowActive: { backgroundColor: "rgba(139, 92, 246, 0.15)", borderWidth: 1, borderColor: "#A855F7" },
  voiceName: { color: "#fff", fontSize: 14, fontFamily: "monospace" },
  voiceBadge: { color: "#22D3EE", fontSize: 11, fontWeight: "bold", fontFamily: "monospace" },
  note: { color: "#8a8ab0", fontSize: 11, fontFamily: "monospace", marginTop: 14, lineHeight: 16 },
});
