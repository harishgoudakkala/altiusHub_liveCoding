const express = require('express');
const router = express();
const UserInformationSchema = require('../models/userInfoModel');

router.post('/addFields', async (req, res) => {
    let userId = req.userId;
    try{
        const {name, age, email, address, phone, dateOfBirth, profilePic, bio} = req.body;
        if (!name ||!email  ||!phone ||!dateOfBirth) {
            return res.status(400).send('This field is required');
        }
        const user = await UserInformationSchema.findOne({userId: userId});
        if (!user) {
            return res.status(404).send('User not found');
        }
        user.name = name;
        user.age = age;
        user.email = email;
        user.address = address;
        user.phone = phone;
        user.dateOfBirth = dateOfBirth;
        user.profilePic = profilePic;
        user.bio = bio;
        await user.save();

    }catch (err) {
        console.log(err);
        return res.status(500).send('Server Error');
    }
    
})

module.exports = router;