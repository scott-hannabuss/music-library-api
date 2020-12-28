const artistControllers = require('./controllers/artists');
const express = require('express')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.json({ result: 'Hello World' });
});

app.post('/artists', artistControllers.create);

app.get('/artists', artistControllers.list);

module.exports = app




