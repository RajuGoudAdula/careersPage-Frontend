/* ===============================
   PUSH NOTIFICATION HANDLER
   =============================== */


   self.addEventListener("push", (event) => {
    if (!event.data) return;
  
    const data = event.data.json();
    console.log(data);
    const options = {
      body: data.body,
  
      // Small icon (always shown)
      icon: "https://careerspagein.netlify.app/CareersPage-logo.ico",
  
      // Small monochrome badge (mainly for Android / PWA)
      badge: "https://careerspagein.netlify.app/CareersPage-logo.ico",
  
      // Large banner image (Chrome / Edge only)
      image: data.image,
  
      // Custom data for click handling
      data: data.data, // { url, jobId, companyId }
  
      // Action buttons
      actions: data.actions || [],
  
      // Prevent duplicate notifications
      tag: data.tag,
      renotify: data.renotify ?? false,
  
      // UX behavior
      requireInteraction: data.requireInteraction ?? false,
      silent: data.silent ?? false,
  
      timestamp: data.timestamp || Date.now(),
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
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
    
  