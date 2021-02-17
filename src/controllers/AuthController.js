const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../models/User');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { 
        expiresIn: 86400,
    });
}

module.exports = {
    async register(req, res) {
        const { email } = req.body;

        if(await User.findOne({ where: { email } }))
            return res.status(400).json({error: 'Email already registered', email: email});

        const user = await User.create( req.body );

        user.password = undefined;

        return res.json({ 
            user,
            token: generateToken({ id: user.id })
        });
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }, attributes: { include: ['password']}});

        if(!user)
            return res.status(400).json({ error: 'User not found' });
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).json({ error: 'Wrong password' });

        user.password = undefined;

        res.json({
            user, 
            token: generateToken({ id: user.id })
        });
    }
}