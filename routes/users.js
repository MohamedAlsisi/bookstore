//Using Express
var express = require('express');
var users = express.Router();
users.use(express.json());
//Using mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });
//Using JOI
const Joi = require('joi');

//Mongoose Schema
const userschema = mongoose.Schema({
    username: { Type: String, trim: true, default: '' },
    password: { Type: String, default: '' },
    repeatPassword: { Type: String, default: '' },
    email: { Type: String, trim: true, default: '' }
});

//Using JOI Validation
const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    repeatPassword: Joi.ref('password'),

    token: [
        Joi.string(),
        Joi.number()
    ],

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: 'true' } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


users.get('/', function (req, res) {
    res.status(200).send('users')
});

module.exports = users;