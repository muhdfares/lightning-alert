// Add this to your window.onload function or at the end of the script:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(registration => console.log('Service Worker Registered:', registration))
    .catch(error => console.error('Service Worker Registration Failed:', error));
}
