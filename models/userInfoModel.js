const mongoose = require('mongoose');

const UserInformationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
        
    },
    phone: {
        type: String,
        
    },
    dateOfBirth: {
        type: Date,
    },
    profilePic: {
        type: String
    },
    bio:{
        type: String
    },

})

module.exports = mongoose.model('UserInformation', UserInformationSchema);