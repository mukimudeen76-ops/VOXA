# 🚀 VOXA — Project Details

> **Full rebrand of the VOXA voice-first mobile AI assistant.** Sab kuchh copy karke
> naye naam **VOXA**, naye brand colors, aur naye docs ke saath taiyaar kiya gaya hai.

---

## 1. Naam & Brand

- **Project Name:** `VOXA`
- **Tagline:** *Speak naturally. Control your device.*
- **Brand Colors:**
  - Primary / Violet: `#8B5CF6`
  - Main / Cyan: `#00E5FF`
  - Background: `#000000`
  - Card: `#0A0714`
- **App Bundle ID (Android):** `com.voxa.assistant`
- **Expo Scheme:** `voxa`

---

## 2. Ye Kya Hai? (What is VOXA?)

VOXA ek **voice-first mobile AI assistant** hai. Aap bolte ho → VOXA real-time sunta hai →
aapke phone par asli actions execute karta hai. Ye isliye "Aaj Tak"-style news app NAHI hai —
ye original VOXA project ka **AI voice assistant** rebrand hai.

### Kya-kya kar sakta hai
- 📞 **Incoming call** ko answer / reject karna, aur caller ka naam loud announce karna
- 🔔 **WhatsApp / Instagram / SMS notifications** padhna aur auto-reply karna
- 🎵 **Spotify / YouTube / media** playback control (play, pause, next, previous)
- 💬 **WhatsApp message** send karna
- 🔗 **Apps** launch karna aur deep-link karna
- ⚡ **Hardware & Settings** (flashlight, Wi-Fi, Bluetooth, Location, Hotspot)
- 📅 **Calendar** check / schedule karna aur **memory** save karna

---

## 3. Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Expo SDK 54, React Native 0.81, Expo Router 6, NativeWind 5, React 19 |
| **Language** | TypeScript |
| **Native** | Kotlin + Java Android modules, NDK / C++ |
| **Voice Engine** | Rust DSP core (`core_engine`) |
| **Backend Services** | Go + Python microservices (voice gateway, STT/TTS, intent router) |
| **ML** | Conformer ASR, neural TTS, Transformer decoders |
| **Deployment** | Docker Compose, Kubernetes, Terraform |

---

## 4. Project Structure

```
VOXA/
├── app/                        # Expo Router screens (Home, Apps, Notes, Settings)
├── components/                 # VOXA UI components (HUD, Orb, Voice node, Visualizer...)
├── constants/                  # Theme, icons, tab data
├── assets/                     # Fonts, icons, images, splash
├── android/                    # Android native wrapper (Kotlin/Java, com.voxa.assistant)
├── core_engine/                # Rust DSP / ASR / transformer engine
├── services/                   # Go + Python microservices
├── sdk/                        # VOXA SDK (Kotlin, Python)
├── bindings/                   # Go CGO, Rust FFI, Node addon
├── docs/                       # API spec & deployment guide
├── deploy/ infra/ production/  # K8s, Terraform, Docker Compose
├── mlops/ testing/ scripts/    # Training, benchmarks, tests
├── app.json                    # Expo config
└── package.json                # Dependencies
```

---

## 5. Setup & Run (Developers)

```bash
# 1. Dependencies install karo
npm install          # ya pnpm install

# 2. Web / Expo dev server
npm run start        # Expo dev server
npm run web          # Web preview

# 3. Android build
npm run android      # expo run:android (custom dev client)
```

> Note: `npm install` registry ke kisi package corruption ki wajah se fail ho sakta hai —
> tab `pnpm install` use karo (ye sahi kaam karta hai).

---

## 6. Security & Privacy

- **100% BYOK (Bring-Your-Own-Key):** Gemini API key device ke secure storage me encrypted rehti hai.
- **Zero Data Logging:** Audio, notifications, ya conversations record/sell nahi hote.
- **Permission Control:** Microphone, overlays, notification listener — sab Settings me on/off ho sakte hain.

---

## 7. Licensing

- **License:** MIT License
- Details: [LICENSE](LICENSE)

---

## 8. Contact

- **Owner / Maintainer:** xtehzeeb.x7@gmail.com
- **Repository:** https://github.com/mukimudeen76-ops/VOXA
