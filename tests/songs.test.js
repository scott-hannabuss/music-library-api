const { expect } = require('chai');
const request = require('supertest');
const { Artist, Album, Song } = require('../src/models');
const app = require('../src/app');

before(async () => {
    try {
        await Artist.sequelize.sync();
        await Album.sequelize.sync();
        await Song.sequelize.sync();
    } catch (err) {
        console.log(err);
    }
});

beforeEach(async () => {
    try {
        await Artist.destroy({ where: {} });
        await Album.destroy({ where: {} });
        await Song.destroy({ where: {} });

        artist = await Artist.create({
            name: "Tame Impala",
            genre: "Rock",
        });

        album = await Album.create({
            name: "InnerSpeaker",
            year: 2010,
            artistId: artist.id,
        });
    } catch (err) {
        console.log(err);
    }
});

describe('POST /album/${album.id}/song', () => {
    it('creates a new song under an album', (done) => {
        request(app)
            .post(`/album/${album.id}/song`)
            .send({
                artist: artist.id,
                name: 'Solitude Is Bliss',
            })
            .then((res) => {
                expect(res.status).to.equal(201)
                console.log(res.body)
                expect(res.body.name).to.equal('Solitude Is Bliss');
                expect(res.body.artistId).to.equal(artist.id);
                expect(res.body.albumId).to.equal(album.id)
                done();
            })
            .catch(error => done(error))
    })
});

describe("with songs in the database", () => {
    let songs;
    beforeEach((done) => {
        Promise.all(
            Promise.all([
                Song.create({
                    name: "Desire Be Desire Go",
                    year: album.year,
                    artistId: artist.id,
                    albumId: album.id,
                }),
                Song.create({
                    name: "Alter Ego",
                    year: album.year,
                    artistId: artist.id,
                    albumId: album.id,
                }),
                Song.create({
                    name: "Lucidity",
                    year: album.year,
                    artistId: artist.id,
                    albumId: album.id,
                }),
            ]).then((documents) => {
                songs = documents;
                done();
            })
        );
    })

    describe('GET /songs', () => {
        it('gets all song records', (done) => {
            request(app)
                .get('/songs')
                .then((res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.length).to.equal(3);
                    res.body.forEach((song) => {
                        const expected = songs.find((a) => a.id === song.id);
                        expect(song.name).to.equal(expected.name);
                    });
                    done();
                });
        });
    });

    describe('PATCH /song/songName', () => {
        it('updates song name', (done) => {
            const song = songs[0];
            request(app)
                .patch(`/song/${song.id}`)
                .send({ name: 'The Less I know the better' })
                .then((res) => {
                    expect(res.status).to.equal(200);
                    Song.findByPk(song.id, { raw: true }).then((updatedSong) => {
                        expect(updatedSong.name).to.equal('The Less I know the better');
                        done();
                    })
                })
                .catch((error) => done(error));
        });
        it('returns a 404 if the song does not exist', (done) => {
            request(app)
                .patch('/song/blablabla')
                .then((res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body.error).to.equal('the song could not be found.');
                    done();
                })
                .catch((error) => done(error));
        })
    });

    describe('DELETE /songs/:songId', () => {
        it('deletes a song record by id', (done) => {
            const song = songs[0];
            request(app)
                .delete(`/songs/${song.id}`)
                .then((res) => {
                    expect(res.status).to.equal(204);
                    Song.findByPk(song.id, { raw: true }).then((deletedSong) => {
                        expect(deletedSong).to.equal(null);
                        done();
                    })
                })
        });
        it('returns a 404 if the song does not exist', (done) => {
            request(app)
                .delete('/songs/3000')
                .then((res) => {
                    expect(res.status).to.equal(404);
                    expect(res.body.error).to.equal('song not found');
                    console.log(res.body.error)
                    done();
                })
        });
    });
})
