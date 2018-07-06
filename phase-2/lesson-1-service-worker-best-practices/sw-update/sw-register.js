if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js?v=20180705121319')
}
navigator.serviceWorker.addEventListener('message', function (e) {
  if (e.data && e.data === 'sw.update') {
    window.location.reload()
  }
})
