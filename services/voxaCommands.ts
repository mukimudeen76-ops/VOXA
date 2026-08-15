/**
 * VOXA — Command Console Engine (merged from VENOM-style phone control)
 *
 * Processes natural-language commands in the sassy Hinglish VOXA persona and
 * performs safe real actions (calls, SMS, apps, settings) via React Native Linking.
 */

import { Linking } from "react-native";

export interface VoxaCommandResult {
  response: string; // VOXA's persona reply
}

const SASSY = [
  "Arey boss, done ho gaya. Aur kuchh?",
  "Ho gaya, hukum! Aur batao.",
  "Bas kar diya, boss. Next?",
];

function pick(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

function open(url: string): void {
  Linking.openURL(url).catch(() => {});
}

export function processVoxaCommand(input: string): VoxaCommandResult {
  const c = input.toLowerCase().trim();

  // --- Greetings / persona ---
  if (/^(hi|hello|hey|namaste|namaskar|yo)\b/.test(c) || c.includes("kaise ho")) {
    return {
      response:
        "Arre boss, aapko kaise nahi pehchanunga! Main VOXA hoon — fully charged aur khade khade aapke hukum ke liye. Batayiye kya kaam hai?",
    };
  }
  if (c.includes("who are you") || c.includes("tum kaun") || c.includes("kya ho")) {
    return {
      response:
        "Main VOXA hoon — LEVEL 1000+ SOVEREIGN ENTITY. Aapki awaaz pe control, aapki phone pe command. Desi swagger, god-tier precision. Simple.",
    };
  }
  if (c.includes("i am boss") || c.includes("main boss") || c.includes("main tehzeeb")) {
    return {
      response:
        "Arre Boss, aapko kaise nahi pehchanunga! Welcome back. Hukum kijiye — kya karna hai aaj?",
    };
  }

  // --- App open ---
  const appMatch = c.match(/^(?:open|launch|khol|chala)\s+(.+)$/);
  if (appMatch) {
    const app = appMatch[1].trim();
    const map: Record<string, string> = {
      whatsapp: "whatsapp://",
      instagram: "instagram://",
      youtube: "youtube://",
      telegram: "tg://resolve",
      camera: "intent:#Intent;action=android.media.action.STILL_IMAGE_CAMERA;end",
      dialer: "tel:",
      settings: "app-settings:",
      maps: "geo:0,0?q=",
    };
    const url = map[app] || `https://www.google.com/search?q=${encodeURIComponent(app)}`;
    open(url);
    return { response: `Hukum! ${app} khol raha hoon, boss. ${pick(SASSY)}` };
  }

  // --- Call contact / number ---
  const callMatch = c.match(/^call\s+(.+)$/);
  if (callMatch) {
    const who = callMatch[1].trim();
    // If it's a number, dial it directly.
    if (/^[+\d\s-]{7,}$/.test(who)) {
      open(`tel:${who.replace(/[^\d+]/g, "")}`);
      return { response: `${who} ko call karta hoon, boss. Line laga do!` };
    }
    // Named contact: explain (native contact resolution not wired in this build).
    return {
      response: `${who} ko call karna hai? Agar address book me full access milta to turant khol deta. Contact enable karo Settings me, boss!`,
    };
  }

  // --- SMS ---
  const smsMatch = c.match(/^sms\s+([+\d\s-]+)\s+(.+)$/);
  if (smsMatch) {
    open(`sms:${smsMatch[1].replace(/[^\d+]/g, "")}?body=${encodeURIComponent(smsMatch[2])}`);
    return { response: `SMS bhej raha hoon: "${smsMatch[2]}". ${pick(SASSY)}` };
  }

  // --- WhatsApp message ---
  const waMatch = c.match(/^whatsapp\s+([\d\s]+)\s+(.+)$/);
  if (waMatch) {
    open(`whatsapp://send?phone=${waMatch[1].replace(/\s/g, "")}&text=${encodeURIComponent(waMatch[2])}`);
    return { response: `WhatsApp par bhej raha hoon. Message ready hai, boss!` };
  }

  // --- Flashlight ---
  if (c.includes("flashlight") || c === "torch" || c.includes("lights on") || c.includes("lights off")) {
    return {
      response:
        "Flashlight ka command sun liya, boss! Native flashlight toggle ke liye extra system permission chahiye. Batao — Settings me permission deni hai to enable karo, warna ye command ready hai.",
    };
  }

  // --- Wi-Fi / Bluetooth settings ---
  if (c.includes("wifi") || c.includes("wi-fi")) {
    open("intent:#Intent;action=android.settings.WIFI_SETTINGS;end");
    return { response: "Wi-Fi settings khol raha hoon, boss. Baad me batao kya connect karna hai!" };
  }
  if (c.includes("bluetooth")) {
    open("intent:#Intent;action=android.settings.BLUETOOTH_SETTINGS;end");
    return { response: "Bluetooth settings, le liye aaye, boss!" };
  }
  if (c.includes("battery")) {
    return { response: "Battery pe nazar rakhta hoon, boss. Detail me batao — level, charging status?" };
  }

  // --- Notifications ---
  if (c.includes("notification") || c.includes("message") || c.includes("message padho")) {
    return {
      response:
        "Notifications padhne ke liye Notification Listener permission chahiye, boss. Settings me enable karo — phir main aapki har incoming WhatsApp/Instagram/SMS turant padhke bataunga!",
    };
  }

  // --- Media control ---
  if (c.includes("play") || c.includes("pause") || c.includes("music") || c.includes("song")) {
    return { response: "Media control command sun liya! Native media session ke liye MediaKey module ready hai. Kya chahiye — play, pause, next?" };
  }

  // --- Camera ---
  if (c.includes("camera") || c.includes("photo")) {
    open("intent:#Intent;action=android.media.action.STILL_IMAGE_CAMERA;end");
    return { response: "Camera khol diya, boss. Smile — click!" };
  }

  // --- Screenshot ---
  if (c.includes("screenshot") || c.includes("screen capture")) {
    return { response: "Screen capture command ready hai, boss. Native screen stream ke liye Screen Capture permission enable karo." };
  }

  // --- Reminder / alarm ---
  if (c.includes("remind") || c.includes("reminder") || c.includes("yaad")) {
    return { response: "Reminder set kar raha hoon, boss. Time aur kya yaad rakhna hai bata do — main on-device Memory Vault me rakhoonga." };
  }

  // --- Memory ---
  if (c.includes("remember") || c.includes("yaad rakho") || c.includes("core memory")) {
    return { response: "Memory lock! Maine note kar liya, boss. Main har baat yaad rakhunga. 🧠" };
  }

  // --- Timer ---
  if (c.includes("timer")) {
    const timerMatch = c.match(/timer\s*(?:of|for|ka|ke)?\s*(\d+)\s*(sec|second|min|minute|mins)?/);
    if (timerMatch) {
      const n = parseInt(timerMatch[1], 10);
      const unit = timerMatch[2];
      // Android media/alarm timer intent
      open("android-app://com.google.android.deskclock");
      return { response: `${n} ${unit?.startsWith("min") ? "minute" : "second"} ka timer, boss! Main DeskClock khol raha hoon — wahan se set kar dena. ⏱️` };
    }
    return { response: "Timer command ready, boss. Kitne seconds/minutes? Batao, main countdown shuru kar doon." };
  }

  // --- Alarm ---
  if (c.includes("alarm") || c.includes("alarm laga")) {
    open("android-app://com.google.android.deskclock");
    return { response: "Alarm set karna hai? DeskClock khol raha hoon, boss — time batao aur main bhi set karne me madad karoonga. ⏰" };
  }

  // --- Volume control ---
  if (c.includes("volume")) {
    const dir = c.includes("up") ? "up" : c.includes("down") ? "down" : c.includes("mute") ? "mute" : c.includes("max") ? "max" : c.includes("low") ? "low" : c.includes("high") ? "high" : "";
    if (dir === "mute") {
      open("android-settings://?settings=volume");
      return { response: "Mute karne ke liye volume settings khol raha hoon, boss. 🔊➖" };
    }
    open("android-settings://?settings=volume");
    return { response: `Volume ${dir || "control"} — settings khol diya, boss. System me set karo.` };
  }

  // --- Brightness ---
  if (c.includes("brightness")) {
    open("android-settings://?settings=display");
    return { response: "Brightness set karna hai? Display settings khol raha hoon, boss. ☀️" };
  }

  // --- Maps / location ---
  if (c.includes("map") || c.includes("location") || c.includes("navigate") || c.includes("kahaan")) {
    const q = c.match(/(?:map|location|navigate)\s+(.+)$/);
    const qText = q ? q[1].trim() : "";
    const query = qText ? encodeURIComponent(qText) : "";
    open(query ? `geo:0,0?q=${query}` : "geo:0,0?q=");
    return { response: `Map khol raha hoon${qText ? ` — "${qText}"` : ""}, boss. 🗺️` };
  }

  // --- Social media ---
  if (c.includes("instagram")) {
    open("instagram://");
    return { response: "Instagram khol diya, boss. Reels scroll karo! 📸" };
  }
  if (c.includes("telegram")) {
    open("tg://resolve");
    return { response: "Telegram khol diya, boss. 💬" };
  }
  if (c.includes("youtube")) {
    open("youtube://");
    return { response: "YouTube khol diya, boss. Kya dekhenge? 🎬" };
  }

  // --- Fallback / unknown ---
  return {
    response:
      "Boss, ye command abhi meri power list me nahi thi — par main seekh raha hoon. Bataiye thoda aur specific kya karna hai? (Try: 'call 9876543210', 'open whatsapp', 'wifi', 'camera', 'sms', 'flashlight', 'alarm', 'volume', 'maps')",
  };
}
