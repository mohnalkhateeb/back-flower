'use strict'
const mongoose = require("mongoose");
const fllowerSchema = new mongoose.Schema({
    name: String,
    photo: String,
    instructions: String
});

const userSchema = new mongoose.Schema({
    email: String,
    fllower : [fllowerSchema]
})

// This creates our model from the above schema, using mongoose's model method
const userModel = mongoose.model('user', userSchema);

// Export the Article model
module.exports = userModel;