const express = require('express');
const bcrypt = require('bcrypt');
const router = express();
const io = require('socket.io');
const playlistModel = require('../models/playlistModel');

//create playlist
router.post('/', async (req, res) => {
    let userId = req.userId;
    try{
        const {title, description, songs } = req.body;
        const playlist = new playlistModel({ title, description, userId, songs });
        await playlist.save();
        res.status(201).json({ message: 'Playlist created successfully' });
    }catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'Invalid request' });
    }
})


//update playlist with socketIO

router.put('/:playlistId/update', async (req, res) => {
    let userId = req.userId;
    try {
        const { title, description, songs } = req.body;
        const playlistId = req.params.playlistId;
        const playlist = await playlistModel.findByIdAndUpdate(playlistId, { title, description, userId, songs }, { new: true });
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        io.emit('playlistUpdated', playlist);
        res.json({ message: 'Playlist updated successfully', playlist });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'Invalid request' });
    }
});

//delete playlist

router.delete('/:playlistId', async (req, res) => {
    let userId = req.userId;
    try {
        const playlistId = req.params.playlistId;
        const playlist = await playlistModel.findByIdAndDelete(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        res.json({ message: 'Playlist deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: 'Invalid request' });
    }
});

module.exports = router;