const express = require('express');
const user = require('../models/userModel');
const bcrypt = require('bcrypt');
const router = express();

router.post('/register', async (req, res) => {
    try{
        const { username, email, password } = req.body;
        if (!username ||!password ||!email) {
            return res.status(400).json({ message: 'Username and password are required' });
        }
        let userDup = await user.findOne({ username })
        if (userDup) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        userDup = await user.findOne({ email });
        if (userDup) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        // const passwordMeetsRequirements = await user.validatePassword(password);
        // if (!passwordMeetsRequirements) {
        //     return res.status(400).json({ message: 'Password does not meet requirements' });
        // }

        let salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
        const newUser = new user({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try{
        if (!email ||!password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await user.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        res.json({ message: 'Login successful', token });
    }catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
   
})


module.exports = router;