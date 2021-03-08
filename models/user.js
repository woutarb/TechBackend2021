const mongoose = require('mongoose');

const schemeName = 'User';
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    beers: { type: Number,required: true},
});
module.exports.User = mongoose.model(schemeName,userSchema);
module.exports.userSchema = this.userSchema;