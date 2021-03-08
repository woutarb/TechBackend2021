import {model, Schema} from "mongoose";
const schemeName = 'User';
export const userSchema = new Schema({
    firstName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    beers: { type: Number,required: true},
});
export const User = model(schemeName,userSchema);
