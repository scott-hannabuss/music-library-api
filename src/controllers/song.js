const { Album, Artist, Song } = require('../models');
const song = require('../models/song');

exports.create = (req, res) => {
    const { albumId } = req.params;
    Song.create(req.body)
        .then(song => {
            song.setAlbum(albumId)
        })
        .then((song) => res.status(201).json(song))
};

exports.list = (_, res) => {
    Song.findAll().then(songs => {
        res.status(200).json(songs);
    });
};

exports.updateSong = (req, res) => {
    const { songId } = req.params;
    Song.update(req.body, { where: { id: songId } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'the song could not be found.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    });
};

exports.deleteSong = (req, res) => {
    const { songId } = req.params;
    Song.destroy({ where: { id: songId } }).then((rowsDeleted) => {
        if (!rowsDeleted) {
            res.status(404).json({ error: 'song not found' });
        } else {
            res.status(204).json(rowsDeleted);
        }
    })
}