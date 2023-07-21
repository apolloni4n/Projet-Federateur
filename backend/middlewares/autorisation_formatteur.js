const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {

    try {
        const token = req.header('x-auth-token');

        if (!token) return res.status(401).send("Not authorized");

        req.user = jwt.verify(token, config.get('jwtPrivateKey'));

        if (!req.user.estFormateur) return res.status(403).send("Not Formateur");

        next();
    } catch (e) {
        return res.status(400).send("Not authorized, wrong token");
    }
};