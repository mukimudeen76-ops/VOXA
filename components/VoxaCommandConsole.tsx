import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { processVoxaCommand } from "../services/voxaCommands";

interface Msg {
  role: "user" | "voxa";
  text: string;
}

export default function VoxaCommandConsole() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "voxa", text: "Boss, VOXA online hai! Hukum kijiye — bolen ya likhen. Kya karna hai?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const result = processVoxaCommand(text);
    setMessages((prev) => [
      ...prev,
      { role: "user", text },
      { role: "voxa", text: result.response },
    ]);
    setInput("");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrap}
    >
      <Text style={styles.title}>🐍 VOXA COMMAND CONSOLE</Text>
      <View style={styles.card}>
        <ScrollView
          style={styles.chat}
          contentContainerStyle={{ padding: 12 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((m, i) => (
            <View
              key={i}
              style={[
                styles.bubble,
                m.role === "user" ? styles.userBubble : styles.voxaBubble,
              ]}
            >
              <Text style={m.role === "user" ? styles.userText : styles.voxaText}>
                {m.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Command likho... (call, open, wifi, sms)"
            placeholderTextColor="#6a6a8a"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <TouchableOpacity style={styles.sendBtn} onPress={send}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.voiceBtn}
          onPress={() => setMessages((p) => [...p, { role: "voxa", text: "Voice mode aapke mic access par active hai. Bolen, boss — main sun raha hoon! 🎙️" }])}
        >
          <Text style={styles.voiceBtnText}>🎙️ Tap to Speak (Voice input ready)</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrap: { width: "100%", marginTop: 14 },
  title: { color: "#A855F7", fontSize: 12, fontWeight: "bold", fontFamily: "monospace", letterSpacing: 1, marginBottom: 8 },
  card: { borderRadius: 16, backgroundColor: "#0A0714", borderWidth: 1, borderColor: "#2a2a4a", overflow: "hidden" },
  chat: { maxHeight: 220, minHeight: 140 },
  bubble: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9, marginVertical: 4, maxWidth: "90%" },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#A855F7" },
  voxaBubble: { alignSelf: "flex-start", backgroundColor: "#12102a", borderWidth: 1, borderColor: "#2a2a4a" },
  userText: { color: "#fff", fontSize: 13, fontFamily: "monospace" },
  voxaText: { color: "#d5d5f0", fontSize: 13, fontFamily: "monospace", lineHeight: 18 },
  inputRow: { flexDirection: "row", alignItems: "center", padding: 10, borderTopWidth: 1, borderTopColor: "#1c1c34" },
  input: { flex: 1, backgroundColor: "#0d0d1f", borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, color: "#fff", fontFamily: "monospace", fontSize: 13, marginRight: 8 },
  sendBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#A855F7", alignItems: "center", justifyContent: "center" },
  sendText: { color: "#fff", fontSize: 18 },
  voiceBtn: { paddingVertical: 12, alignItems: "center", borderTopWidth: 1, borderTopColor: "#1c1c34" },
  voiceBtnText: { color: "#22D3EE", fontSize: 12, fontFamily: "monospace" },
});
