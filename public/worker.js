self.addEventListener('push', (event) => {
  const data = event.data.json()
  console.log('push received', JSON.stringify(data, null, 2))
  self.registration.showNotification('Notification', data)
})

const getAction = (event) => {
  if (event.action) return event.action
  const data = event.notification.data || {}
  if (data.defaultAction) return data.defaultAction

  return null
}

self.addEventListener('notificationclick', (event) => {
  console.log('Click!')
  const { notification } = event
  const data = notification.data || {}
  const action = getAction(event)

  switch (action) {
    case 'ad': clients.openWindow(data.url); break;
    case 'central': clients.openWindow('/central.html'); break;
    default:
  }

  notification.close();
}, false);