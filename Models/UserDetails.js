const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        mobileNo:{
            type: Number,
            required: true
        },
        password:{
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('UserDetails', UserSchema, 'user_details');