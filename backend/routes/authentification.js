const Joi = require('joi');
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { UtilisateurDB } = require("../models/utilisateur");

//---Server
const express = require("express");
const router = express.Router();




router.post("/", async (req, res) => {
    const { error } = validateUtilisateur(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let utilisateur = await UtilisateurDB.findOne({ username: req.body.username });

    if (!utilisateur) return res.status(400).send("invalid username or password");

    const validPassword = await bcrypt.compare(req.body.password, utilisateur.password);

    if (!validPassword) return res.status(400).send("invalid username or password");

    res.send(utilisateur.generateAuthToken());
});

function validateUtilisateur(utilisateur) {
    const utilisateurSchema = Joi.object({
        username: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(1).max(255).required(),
    });

    return utilisateurSchema.validate(utilisateur);
}

module.exports = router;
