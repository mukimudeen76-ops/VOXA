import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notes = [
  { title: "Core Memory", body: "Car parking spot is level 2." },
  { title: "Reminder", body: "Team sync meeting at 2 hours from now." },
  { title: "Quick Fact", body: "VOXA keeps long-term facts on-device." },
];

export default function NotesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>🗒️ VOXA MEMORY & NOTES</Text>
      <Text style={styles.subtitle}>Your saved core memories, synced with the voice engine.</Text>
      {notes.map((n, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.cardTitle}>{n.title}</Text>
          <Text style={styles.cardBody}>{n.body}</Text>
        </View>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#00E5FF", fontSize: 16, fontWeight: "bold", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 },
  subtitle: { color: "#8a8ab0", fontSize: 12, fontFamily: "monospace", marginBottom: 18 },
  card: { padding: 16, marginVertical: 6, borderRadius: 12, backgroundColor: "#0A0714", borderLeftWidth: 3, borderLeftColor: "#00E5FF" },
  cardTitle: { color: "#00E5FF", fontSize: 13, fontWeight: "bold", fontFamily: "monospace", marginBottom: 4 },
  cardBody: { color: "#d0d0e8", fontSize: 13, fontFamily: "monospace" },
});
