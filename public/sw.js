/* ===============================
   PUSH NOTIFICATION HANDLER
   =============================== */


   self.addEventListener("push", (event) => {
    console.log("[SW] Push event received");
  
    // ❌ No payload
    if (!event.data) {
      console.warn("[SW] Push event has no data");
      return;
    }
  
    let data;
  
    // 🔒 Safely parse payload
    try {
      data = event.data.json();
      console.log("[SW] Push payload:", data);
    } catch (err) {
      console.error("[SW] Failed to parse push payload", err);
      return;
    }
  
    // ❌ Mandatory fields check
    if (!data.title || !data.body) {
      console.warn("[SW] Missing title/body in push payload", data);
      return;
    }
  
    const options = {
      body: data.body,
  
      // Small icon (always shown)
      icon: "https://careerspagein.netlify.app/CareersPage-logo.ico",
  
      // Badge (Android / PWA)
      badge: "https://careerspagein.netlify.app/CareersPage-logo.ico",
  
      // Large image (Chrome / Edge)
      image: data.image || undefined,
  
      // Custom data for click handling
      data: data.data || {},
  
      // Action buttons
      actions: Array.isArray(data.actions) ? data.actions : [],
  
      // Prevent duplicates
      tag: data.tag || undefined,
      renotify: Boolean(data.renotify),
  
      // UX behavior
      requireInteraction: Boolean(data.requireInteraction),
      silent: Boolean(data.silent),
  
      timestamp: data.timestamp || Date.now(),
    };
  
    // ✅ Show notification
    event.waitUntil(
      self.registration
        .showNotification(data.title, options)
        .then(() => {
          console.log("[SW] Notification shown successfully ✅");
        })
        .catch((err) => {
          console.error("[SW] Failed to show notification ❌", err);
        })
    );
  });
  
  
  /* ===============================
     NOTIFICATION CLICK HANDLER
     =============================== */
  
     self.addEventListener("notificationclick", (event) => {
      event.notification.close();
    
      const action = event.action;
      const data = event.notification.data;
    
      if (!data || !data.url) return;
    
      event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
          // Focus existing tab if open
          for (const client of clientList) {
            if (client.url === data.url && 'focus' in client) return client.focus();
          }
    
          // Otherwise, open new tab
          if (action === "save") {
            return clients.openWindow(`${data.url}?save=true`);
          }
          return clients.openWindow(data.url);
        })
      );
    });
    
  