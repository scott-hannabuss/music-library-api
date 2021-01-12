const artistControllers = require('./controllers/artists')
const albumControllers = require('./controllers/albums')
const songControllers = require('./controllers/song')
const express = require('express')
const app = express()
app.use(express.json())

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

app.get('/artists/:artistId', artistControllers.getArtistById)

app.patch('/artists/:id', artistControllers.updateArtist)

app.delete('/artists/:id', artistControllers.deleteArtist)

app.post('/artists/:artistId/albums', albumControllers.create)

app.get('/albums', albumControllers.list)

app.patch('/albums/:albumId', albumControllers.updateAlbum)

app.delete('/albums/:albumId', albumControllers.deleteAlbum)

app.post('/album/:albumId/song', songControllers.create)

app.get('/songs', songControllers.list)

app.patch('/song/:songId', songControllers.updateSong)

app.delete('/songs/:songId', songControllers.deleteSong)

module.exports = app




