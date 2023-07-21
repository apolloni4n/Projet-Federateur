const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true,
    },
    username: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 2000,
        //required: true,
    },
    phone:{
        type:String,
        minlength:10,
        maxlength:14,
        required: true
    },
    email:{
        type:String,
        minlength:8,
        maxlength:25,
        required: true
    },
    birth:{
        type:String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('utilisateur', utilisateurSchema);