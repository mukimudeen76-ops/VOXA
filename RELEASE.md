# 🚀 VOXA — Release & GitHub Actions Guide

Ye project **2 GitHub Actions workflows** ke saath aata hai jo apne aap release APK
banate aur upload karte hain.

---

## 📁 Workflows

### 1. `release.yml` — Release APK (auto)

- **Trigger:** jab bhi version tag push ho, jaise `v1.0.0`
- **Kya karta hai:**
  1. Code checkout
  2. Node 20 + JDK 17 + Android SDK setup
  3. Dependencies install (pnpm)
  4. Expo prebuild (Android project generate)
  5. `assembleRelease` → **release APK build**
  6. **GitHub Release create** karta hai aur APK usme attach karta hai

### 2. `ci.yml` — CI checks

- **Trigger:** push/PR on `main`
- **Kya karta hai:** TypeScript type-check + ESLint

---

## 🔐 GitHub Secrets (optional, sirf signing ke liye)

Release APK **bina signing ke bhi banega** (debug signing se) — turant test ke liye perfect.

Par proper signed release ke liye ye secrets repo me add karo:

| Secret | Value |
|---|---|
| `ANDROID_KEYSTORE_BASE64` | apni keystore file ka base64 |
| `ANDROID_KEYSTORE_PASSWORD` | keystore password |
| `ANDROID_KEY_ALIAS` | key alias |
| `ANDROID_KEY_PASSWORD` | key password |

> Secrets add karo: GitHub → repo → **Settings → Secrets and variables → Actions**

---

## 🏷️ Release kaise banayein (ek command)

```bash
# Apne repo me ye push karo
git remote add origin https://github.com/<username>/VOXA.git
git add .
git commit -m "chore: initial VOXA release"
git push -u origin main

# Release tag push karo — workflow apne aap chal jayega
git tag v1.0.0
git push origin v1.0.0
```

Release banne ke baad GitHub repo ke **Releases** page par APK milega.

---

## 🧪 Locally test karne ke liye

```bash
pnpm install
npx expo prebuild --platform android
cd android && ./gradlew assembleRelease
# APK yahan milega:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## 📦 Tag se version name set karna

Workflow abhi `app.json` / `build.gradle` ki version (1.0.0) use karta hai. Agar har tag par
version bhi auto-update chahiye to build.gradle me versionCode/versionName ko tag se lena
hoga — batao, main add kar doon.
