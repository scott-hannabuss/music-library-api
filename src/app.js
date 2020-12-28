const artistControllers = require('./controllers/artists');
const express = require('express')
const app = express()
app.use(express.json())

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:artistID', artistControllers.getArtistById)

module.exports = app




