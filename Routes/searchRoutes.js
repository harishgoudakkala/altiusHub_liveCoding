const client = require('elastic-client');
const clientis = new client.Client({
    host: 'localhost:8000',
    log: 'trace'
});
const express = require('express');
const playlist = require("../models/playlistModel")
const router = express();

const searchElastic = async (title) => {
    try {
        const response = await clientis.search({
            index: 'playlists',
            body: {
                query: {
                    match: {
                        title: title
                    }
                }
            }
        });
        return response.hits.hits.map(hit => hit._source);
    } catch (error) {
        throw error;
    }
}

//search a playlist by title on playlists

const searchPlaylistByTitle = async (title) => {
    try {
        const playlists = await playlist.find({ title: title });
        return playlists;
    } catch (error) {
        throw error;
    }
} 

router.get('/search', async (req, res) => {
    try {
        const title = req.query.title;
        const result = await searchElastic(title);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/searchByTitle', async (req, res) => {
    try {
        const title = req.query.title;
        const result = await searchPlaylistByTitle(title);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;