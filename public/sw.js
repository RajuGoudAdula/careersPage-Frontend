/* ===============================
   PUSH NOTIFICATION HANDLER
   =============================== */

   self.addEventListener("push", (event) => {
    if (!event.data) return;
  
    const data = event.data.json();
  
    const options = {
      body: data.body,
  
      // Small icon (always shown)
      icon: `${process.env.FRONTEND_URL}/CareersPage-logo.ico`,
  
      // Small monochrome badge (mainly for Android / PWA)
      badge: `${process.env.FRONTEND_URL}/CareersPage-logo.ico`,
  
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
  
    // Default click OR "View Job"
    if (action === "" || action === "view") {
      event.waitUntil(
        clients.openWindow(data.url)
      );
      return;
    }
  
    // "Save Job" action
    if (action === "save") {
      event.waitUntil(
        clients.openWindow(`${data.url}?save=true`)
      );
    }
  });
  