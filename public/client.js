const publicVapidKey = 'BLTZG43_0kMh9FRLyRTbGa9ZMClt45xQNnxTqKzXMqY4jDMR3cy6MQohYStWuM4uleeix-3OgIkO7KnJVRloDLc'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const send = async () => {
  console.log('Registering sw')
  const register = await navigator.serviceWorker.register('/worker.js', {
    scope: '/'
  })

  console.log('registered')
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  })

  console.log('push registered')

  console.log('Sending push')
  await fetch('/subscribe', {
    method: 'post',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })

  console.log('push sent')
}

if ('serviceWorker' in navigator) {
  send().catch((error) => {
    console.log(error)
  })
}
