<div align="center">

![VOXA Mobile AI Assistant](./assets/banner.png)

### Voice-First Mobile AI Execution System (v1.0.0)

**Speak naturally. Control your device. Automate workflows on Android with voice commands.**

---

**VOXA executes your spoken commands directly on your phone — calls, notifications,
media, apps, hardware, and calendar — in real time.**

</div>

---

# 📋 Table of Contents

- [⚡ Overview](#-overview)
- [🎯 What is Voice-First Mobile?](#-what-is-voice-first-mobile)
- [✨ Key Capabilities](#-key-capabilities)
- [🛠️ Tool Registry & Examples](#-tool-registry--examples)
- [🧠 Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Setup & Run](#-setup--run)
- [🔒 Security & Privacy](#-security--privacy)
- [🪡 Open-Core Model & Licensing](#-open-core-model--licensing)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

# ⚡ Overview

VOXA is **not a basic chatbot.** It is a **voice-first mobile AI assistant** that listens to
your spoken commands in real time and executes real actions directly on your phone —
answering or rejecting incoming calls, announcing caller names out loud, reading and
auto-replying to WhatsApp/Instagram/SMS notifications, controlling Spotify/YouTube/media
playback, opening apps, toggling hardware and system settings, and managing your calendar.

> **Speak naturally. VOXA understands intent. Actions happen live on your device.**

---

# 🎯 What is Voice-First Mobile?

Traditional apps force you to unlock your screen, find an icon, tap buttons, and type text.
VOXA changes that completely:

```
Your Spoken Voice
    ↓ (Bidirectional Real-Time PCM Stream)
Gemini Live (WebSocket BidiGenerateContent)
    ↓ (Intent & Action Recognition)
VOXA Mobile Execution Engine
    ↓ (Native Kotlin Modules & Hardware APIs)
Calls / Notifications / Spotify / WhatsApp / Settings / Camera / Overlays
```

- **Latency:** Sub-second, zero-latency bidirectional voice streams.
- **Echo Protection:** Ultra-early synchronous mic auto-mute with acoustic decay protection.
- **Background Resilient:** Runs via floating system overlays and background service loops.
- **Multimodal:** Real-time screen streaming for live visual context.

---

# ✨ Key Capabilities

### 📞 Incoming Call Management & Caller Name Announcer
Native `TelecomManager` integration detects ringing calls, resolves contact names, and
accepts or declines calls hands-free with TTS caller announcement.

### 🔔 Real-Time Notification Listener & Auto-Responder
A background `NotificationListenerService` captures incoming messages from WhatsApp,
Instagram, Telegram, and SMS, and can generate intelligent inline auto-replies.

### 🎵 System-Wide Media Controller
MediaKey intent broadcasts plus `MediaSessionManager` integration control active playback
across Spotify, YouTube, Apple Music, and podcast apps.

### ⚡ Gemini Live & Raw WebSocket Pipeline
Low-latency raw JSON WebSocket over
`wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent`
with out-of-band live event injection.

---

# 🛠️ Tool Registry & Examples

### 📞 Cellular Call Controller (`control_incoming_call`)
- **Params:** `action` (`"answer" | "reject" | "announce"`)
- *"Who is calling right now?"* → Announces the caller name.
- *"Answer the call."* → Accepts the ringing call.
- *"Reject the call."* → Hangs up.

### 🔔 Notification Listener & Auto-Responder (`manage_notification_listener`)
- **Params:** `action` (`"read_latest" | "enable_auto_reply" | "disable_auto_reply"`), `appFilter`
- *"Read my latest WhatsApp notifications."*
- *"Turn on auto-reply mode."*

### 🎵 Media Playback Controller (`control_media_playback`)
- **Params:** `action` (`"play" | "pause" | "toggle" | "next" | "previous"`)
- *"Pause the music."* / *"Skip to the next song."*

### 💬 WhatsApp Messaging (`send_whatsapp_message`)
- **Params:** `contactName`, `message`
- *"Send a WhatsApp message to Mom asking what's for dinner."*

### 📞 Contacts & Calls (`search_contacts`, `make_phone_call`, `send_sms_message`)
- *"Call Rahul."* / *"Send an SMS saying call me back."*

### 🔗 App Launching & Deep Links (`open_deep_link`, `open_app`, `close_app`)
- *"Play Believer on YouTube."* / *"Open Spotify and play synthwave."*

### ⚡ Hardware & Settings (`control_device_hardware`)
- **Params:** `target` (`"flashlight" | "wifi" | "bluetooth" | "location" | "hotspot"`), `action`
- *"Turn on flashlight."* / *"Open Wi-Fi settings."*

### 📅 Calendar & Memory (`check_schedule`, `schedule_new_event`, `save_core_memory`, `access_core_memory`)
- *"What's on my calendar for today?"*
- *"Schedule Team Sync 2 hours from now for 30 minutes."*
- *"Remember my parking spot is level 2."*

---

# 🧠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Expo SDK 54, React Native 0.81, Expo Router 6, NativeWind 5, React 19 |
| **Language** | TypeScript |
| **Native** | Kotlin + Java Android modules, NDK / C++ |
| **Voice Engine** | Rust DSP core (`core_engine`), Go gateway & microservices |
| **ML** | Conformer ASR, neural TTS, Transformer decoders, Python training scripts |
| **Deployment** | Docker Compose, Kubernetes (`deploy/k8s`), Terraform (`infra`) |

---

# 📁 Project Structure

```
VOXA/
├── app/                        # Expo Router screens (Home, tabs, layout)
├── components/                 # VOXA UI components (HUD, Orb, Voice node, Visualizer...)
├── constants/                  # Theme, icons, and tab data
├── assets/                     # Fonts, icons, images, splash
├── android/                    # Android native wrapper (Kotlin/Java modules)
├── core_engine/                # Rust DSP / ASR / transformer engine
├── services/                   # Go + Python microservices (voice gateway, STT/TTS...)
├── sdk/                        # VOXA SDK bindings (Kotlin, Python)
├── bindings/                   # Go CGO, Rust FFI, Node addon
├── docs/                       # API spec & deployment guide
├── deploy/                     # Kubernetes manifests
├── infra/                      # Terraform provisioning
├── production/                 # Docker Compose + feature flags
├── mlops/ testing/ scripts/    # Training, benchmarks, tests
├── app.json                    # Expo app config
└── package.json                # Dependencies
```

---

# 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the Expo development server
npm run start
# or open web preview
npm run web
```

To build the Android app:
```bash
npm run android        # expo run:android (custom dev client)
```

---

# 🔒 Security & Privacy

- **100% Bring-Your-Own-Key (BYOK):** Your Gemini API key is stored encrypted in the
  device's secure local storage and never leaves your device.
- **Biometric & Permission Control:** Overlays, notification listener, and microphone access
  are explicitly requested and togglable in Settings.
- **Zero Data Logging:** No audio streams, notification contents, or conversations are
  recorded or sold.

---

# 🪡 Open-Core Model & Licensing

VOXA follows an **Open-Core commercial model**:

- **Public Repository:** UI shell, navigation, theme system, and community integration
  examples.
- **Private Production Core:** Native voice execution engine, Kotlin modules, and low-latency
  PCM pipelines.

> 🔒 Full AI execution requires an active **Mobile PRO License**.

---

# 🤝 Contributing

We welcome UI improvements, bug fixes, and community contributions to the frontend shell.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feat/my-widget`).
3. Commit and open a Pull Request.

---

# 📜 License

The UI Shell is licensed under the **MIT License**. The core VOXA native voice engine and
agent execution logic are proprietary software subject to the **VOXA Commercial License**.
See [LICENSE](LICENSE) for full details.

---

<div align="center">

**System Online. VOXA v1.0.0 Activated.**

</div>
