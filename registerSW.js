if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/elite-task/sw.js', { scope: '/elite-task/' })})}