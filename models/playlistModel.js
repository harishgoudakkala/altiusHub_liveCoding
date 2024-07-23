const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    songs: [{
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        }
    }]
})

module.exports = mongoose.model('Playlist', playlistSchema);