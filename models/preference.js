const mongoose = require('mongoose');

const schemeName = 'Preference';
const preferenceSchema = new mongoose.Schema({
    genderPref: { type: String, required: true },
    agePref: { type: Number, required: true },
    percentOverlap: { type: Number, required: true },
});
module.exports.Preference = mongoose.model(schemeName,preferenceSchema);
module.exports.preferenceSchema = this.preferenceSchema;