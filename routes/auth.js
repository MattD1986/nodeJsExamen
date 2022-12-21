const express = require('express');
const router = express.Router();

const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const { User } = require('../models/user')

router.post('/', async (req, res) =>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let currentUser = await User.findOne({username: req.body.username});
    if(!currentUser) res.status(400).send('Invalid username');

    const validPassword = await bcrypt.compare(req.body.password, currentUser.password);
    if(!validPassword) res.status(400).send('The given password is incorrect');

    const token = jwt.sign({_id: currentUser._id}, config.get('jwtPrivateKey'))
});


function validate(req){
    const schema = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        password: Joi.string().min(8).required()
    });

    return schema.validate(req)
}

module.exports = router