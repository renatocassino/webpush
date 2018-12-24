const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')

const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

const publicVapidKey = 'BLTZG43_0kMh9FRLyRTbGa9ZMClt45xQNnxTqKzXMqY4jDMR3cy6MQohYStWuM4uleeix-3OgIkO7KnJVRloDLc'
const privateVapidKey = 'De6idNaHUIOPXiFmUKN5YQPE0ZNIuseoM6fX8wBKqS0'

webpush.setVapidDetails('mailto:renatocassino@gmail.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req, res) => {
  const subscription = req.body

  res.status(200).json({})

  fs.unlinkSync('./subscription.json')
  fs.writeFileSync('./subscription.json', JSON.stringify(subscription, null, 2))
  const payload = JSON.stringify({
    title: 'Push test'
  })

  console.log(payload)

  webpush.sendNotification(subscription, payload).catch((error) => console.error(error))
})

const port = 5000

app.listen(port, () => {
  console.log('server start')
})
