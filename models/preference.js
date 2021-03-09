const mongoose = require('mongoose');

const schemeName = 'Preference';
const preferenceSchema = new mongoose.Schema({
    genderOther: { type: String, required: true },
    agePreference: { type: Number, required: true },
    percent: { type: Number, required: true },
});
module.exports.User = mongoose.model(schemeName,preferenceSchema);
module.exports.preferenceSchema = this.preferenceSchema;