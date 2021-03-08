import {model, Schema} from "mongoose";
const schemeName = 'User';
const userSchema = new Schema({
    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    beers: { type: Number,required: true},
});
const User = model(schemeName,userSchema);
