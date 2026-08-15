import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const apps = [
  "WhatsApp",
  "Instagram",
  "Telegram",
  "Spotify",
  "YouTube",
  "Phone / Contacts",
  "Calendar",
  "Settings",
];

export default function AppsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>⚡ VOXA APP ROUTER</Text>
      <Text style={styles.subtitle}>Say a command to launch or control any app.</Text>
      <FlatList
        data={apps}
        keyExtractor={(item) => item}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.rowText}>{item}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000", padding: 20 },
  title: { color: "#00E5FF", fontSize: 16, fontWeight: "bold", fontFamily: "monospace", letterSpacing: 1, marginBottom: 6 },
  subtitle: { color: "#8a8ab0", fontSize: 12, fontFamily: "monospace", marginBottom: 18 },
  row: {
    padding: 16,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: "#0A0714",
    borderLeftWidth: 3,
    borderLeftColor: "#8B5CF6",
  },
  rowText: { color: "#fff", fontSize: 15, fontFamily: "monospace" },
});
