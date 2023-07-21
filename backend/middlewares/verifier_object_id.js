const mongoose = require('mongoose');
const config = require('config');

module.exports = function (req, res, next) {

    if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).send("Bad id");

    next();
};