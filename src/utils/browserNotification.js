import axios from "axios";
import { createPushSubscription } from "./pushNotification";


const BaseURL = 'http://localhost:5000/api';
const BACKEND_URL = 'https://careerspage-backend.onrender.com/api';

/**
 * Requests browser notification permission and subscribes the user.
 * Shows toasts for feedback instead of console logs.
 */
export async function requestBrowserPermission(alertId,showToast) {
  // 1️⃣ Check browser support
  if (!("Notification" in window)) {
    showToast("Browser notifications are not supported in this browser.", "error");
    return;
  }

  // 2️⃣ If already blocked
  if (Notification.permission === "denied") {
    showToast("You have blocked notifications. Enable them in browser settings to receive alerts.", "warning");
    return;
  }

  // 3️⃣ Ask permission if not already granted
  let permission = Notification.permission;
  if (permission !== "granted") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    showToast("Notification permission not granted. You won’t receive job alerts in browser.", "info");
    return;
  }

  try {
    // 4️⃣ Create PUSH subscription
    const subscription = await createPushSubscription();

    // 5️⃣ Send subscription to backend
    await axios.post(`${BACKEND_URL}/alert/browser-notification`, {
      alertId,
      subscription,
    });

    // 6️⃣ Optional confirmation notification
    new Notification("Job alerts enabled 🎉", {
      body: "You’ll be notified when matching jobs are posted",
    });

    showToast("Browser notifications enabled successfully!", "success");
  } catch (err) {
    console.error("Error subscribing to notifications:", err);
    showToast("Failed to enable browser notifications.", "error");
  }
}
