const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    //Verifica se o token foi enviado
    if(!authHeader)
        return res.status(401).json({ error: 'No token provided'});

    const parts = authHeader.split(' ');

    //Verifica se o token possui duas partes
    if(!parts.length === 2)
        return res.status(401).json({ error: 'Token error' });
    
    const [ scheme, token ] = parts;

    //Verifica se a primeira parte do token possui 'Bearer'
    if(!/^Bearer$/i.test(scheme))
        return res.status(401).json({ error: 'Token malformatted'});

    //Funcao que verifica se o token eh valido, recebendo como parametro, o token, o hash usado para gerar o token e um callback de erro
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).json({ error: 'Token invalid'});

        req.userId = decoded.id;

        return next();
    })
}