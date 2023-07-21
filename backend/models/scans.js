const mongoose = require("mongoose");

const scanSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true,
    },
    targets: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true,
       default: "127.0.0.1",
    },
    scantime: {
         type: Date, 
         required: true, 
         default: Date.now },
  user_id:{
    type: String,
    minlength: 1,
    maxlength: 255,
    required: true,
   default: "63d2c6698c8a834aa0127e78",
  }
   
});

module.exports = mongoose.model('scanSchema', scanSchema);