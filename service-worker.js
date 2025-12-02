self.addEventListener("install", (e) => {
  console.log("Service Worker: Installed");
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("Service Worker: Activated");
  return self.clients.claim();
});

// ------------------------------
// Periodic Background Sync
// ------------------------------
self.addEventListener("periodicsync", async (event) => {
  if (event.tag === "lightning-check") {
    console.log("Running periodic lightning check...");

    try {
      const res = await fetch("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast");
      const data = await res.json();

      const area = data.items[0].forecasts.find(f => f.area === "Tampines");
      const forecast = area ? area.forecast : "";

      const alertKeywords = ["Thunder", "TShowers"];
      const isAlert = alertKeywords.some(k => forecast.toLowerCase().includes(k.toLowerCase()));

      if (isAlert) {
        registration.showNotification("Lightning Alert ⚡", {
          body: `Forecast: ${forecast}`,
          icon: "icon-192.png",
          badge: "icon-192.png"
        });
      }
    } catch (err) {
      console.error("Periodic Check Failed:", err);
    }
  }
});
