import { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const [overlays, setOverlays] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [microphone, setMicrophone] = useState(false);

  const Row = ({ label, value, onValueChange }: { label: string; value: boolean; onValueChange: (v: boolean) => void }) => (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#22223a", true: "#8B5CF6" }}
        thumbColor={value ? "#00E5FF" : "#666"}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>⚙️ VOXA SETTINGS</Text>
      <Text style={styles.subtitle}>Permissions & privacy controls.</Text>
      <View style={styles.card}>
        <Row label="Floating Overlay" value={overlays} onValueChange={setOverlays} />
        <Row label="Notification Listener" value={notifications} onValueChange={setNotifications} />
        <Row label="Microphone Access" value={microphone} onValueChange={setMicrophone} />
      </View>
      <Text style={styles.note}>API Key is stored securely on-device (BYOK) and never leaves your device.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#00E5FF", fontSize: 16, fontWeight: "bold", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 },
  subtitle: { color: "#8a8ab0", fontSize: 12, fontFamily: "monospace", marginBottom: 18 },
  card: { borderRadius: 14, backgroundColor: "#0A0714", padding: 6, borderWidth: 1, borderColor: "#1c1c34" },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 14 },
  rowLabel: { color: "#fff", fontSize: 14, fontFamily: "monospace" },
  note: { color: "#8a8ab0", fontSize: 11, fontFamily: "monospace", marginTop: 18, lineHeight: 16 },
});
