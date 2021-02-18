const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth');
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
    },

    async forgot_password(req, res) {
        const { email } = req.body;

        
        const user = await User.findOne({ where: { email }, attributes: { exclude: ['passwordResetToken', 'passwordResetExpires'] } });

        if(!user)
            return res.status(400).json({ error: 'User not found'});

        //Gera um token aleatorio de 20 bytes e converte para um string hexadecimal
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        user.passwordResetToken = token;
        user.passwordResetExpires = now;
        
        await user.save();

        mailer.sendMail({
            to: email,
            from: 'mateus55henrique@hotmail.com',
            template: 'auth/forgot_password',
            context: { token }
        }, (err) => {

            if(err) return res.status(400).json({ error: 'Cannot send forgot password email' });

            return res.json({ message: "Verify your email inbox" });
        })
    },

    async reset_password(req, res) {
        const { email, token, password } = req.body;

        const user = await User.findOne({
            where: { email }, 
            attributes: { 
                include: ['password_reset_token', 'password_reset_expires']
            }
        });

        if(!user)
            return res.status(400).json({ error: 'User not found'});

        if(token !== user.password_reset_token)
            return res.status(400).json({ error: 'Invalid token' });

        const now = new Date();

        if(now > user.password_reset_expires)
            return res.status(400).json({ error: 'Token expired, generate a new one' });

        user.password = password;

        await user.save();

        return res.json({ message: 'New password saved' });

    }
}