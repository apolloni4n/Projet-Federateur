const mongoose = require("mongoose");

const rapportsSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true,
    },
    user: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true,
    },
   
  
   
});

module.exports = mongoose.model('rapportsSchema', rapportsSchema);