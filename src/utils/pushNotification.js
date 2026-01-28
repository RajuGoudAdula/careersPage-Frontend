const VAPID_PUBLIC_KEY = "BDKAw_zvYvX9TdRiaQf6UkK19bP3gbCKRK96-Zz-Cbf55jr95y3SpP-cmEWuic0e7DI6d0fh030q89HQBZIPqUc";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  return Uint8Array.from(atob(base64), c => c.charCodeAt(0));
}

export async function createPushSubscription() {
  const registration = await navigator.serviceWorker.ready;

  return await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
}
