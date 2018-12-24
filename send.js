const webpush = require('web-push')
const fs = require('fs')

const publicVapidKey = 'BLTZG43_0kMh9FRLyRTbGa9ZMClt45xQNnxTqKzXMqY4jDMR3cy6MQohYStWuM4uleeix-3OgIkO7KnJVRloDLc'
const privateVapidKey = 'De6idNaHUIOPXiFmUKN5YQPE0ZNIuseoM6fX8wBKqS0'

webpush.setVapidDetails('mailto:renatocassino@gmail.com', publicVapidKey, privateVapidKey)

const subscription = JSON.parse(fs.readFileSync('./subscription.json').toString())

const icon = '/olx.png'

const payload = JSON.stringify({
  title: 'Anúncio excluído',
  body: 'Seu anúncio foi removido das listas.',
  data: {
    url: 'central.html',
    id: 123,
    defaultAction: 'central',
  },
  icon,
  actions: [
    {title: 'Ver anúncio', action: 'ad'},
    {title: 'Ir para a central', action: 'central'},
  ]
})

console.log(subscription)
webpush.sendNotification(subscription, payload).catch((error) => console.error(error))


/*
Works
{
  "title": "Anúncio excluído",
  "data": {
    "url": "central.html"
  }
}


 */