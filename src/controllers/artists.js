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
            res.status(404).json({ error: 'The artist could not be found.' });
        } else {
            res.status(200).json(artist);
        }
    });
};
