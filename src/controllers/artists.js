const { Artist } = require('../models');

exports.create = (req, res) => {
    Artist.create(req.body).then(artist => res.status(201).json(artist));
};

exports.list = (_, res) => {
    Artist.findAll().then(artists => {
        res.status(200).json(artists);
    });
};

exports.getArtistById = (req, res) => {
    const { artistId } = req.params;
    Artist.findByPk(artistId).then(artist => {
        if (!artist) {
            res.status(404).json({ error: 'the artist could not be found.' });
        } else {
            res.status(200).json(artist);
        }
    });
};

exports.updateArtist = (req, res) => {
    const { id } = req.params;
    Artist.update(req.body, { where: { id } }).then(([rowsUpdated]) => {
        if (!rowsUpdated) {
            res.status(404).json({ error: 'the artist could not be found.' });
        } else {
            res.status(200).json(rowsUpdated);
        }
    });
};

exports.deleteArtist = (req, res) => {
    const { id } = req.params;
    console.log(id)
    Artist.destroy({ where: { id } }).then((rowsDeleted) => {
        console.log(rowsDeleted)
        if (!rowsDeleted) {
            res.status(404).json({ error: 'artist not found' });
        } else {
            res.status(204).json(rowsDeleted);
        }
    }).catch(error => res.status(500).json(error));
}