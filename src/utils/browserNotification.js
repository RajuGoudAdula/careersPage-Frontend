import axios from "axios";
import { createPushSubscription } from "./pushNotification";

// ✅ Backend URL from env (works in local + Netlify)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Requests browser notification permission and subscribes the user.
 */
export async function requestBrowserPermission(alertId, showToast) {
  // 1️⃣ Check browser support
  if (!("Notification" in window)) {
    showToast("Browser notifications are not supported in this browser.", "error");
    return;
  }

  // 2️⃣ If already blocked
  if (Notification.permission === "denied") {
    showToast(
      "You have blocked notifications. Enable them in browser settings to receive alerts.",
      "warning"
    );
    return;
  }

  // 3️⃣ Request permission if needed
  let permission = Notification.permission;
  if (permission !== "granted") {
    permission = await Notification.requestPermission();
  }

  if (permission !== "granted") {
    showToast(
      "Notification permission not granted. You won’t receive job alerts in browser.",
      "info"
    );
    return;
  }

  try {
    // 4️⃣ Create PUSH subscription
    const subscription = await createPushSubscription();

    // 5️⃣ Send subscription to backend
    const res = await axios.post(`${BACKEND_URL}/alert/browser-notification`, {
      alertId,
      subscription,
    });

    console.log(res?.data?.message);

    showToast("Browser notifications enabled successfully!", "success");
  } catch (err) {
    console.error("Error subscribing to notifications:", err);
    showToast("Failed to enable browser notifications.", "error");
  }
}
