const express = require('express');
const router = express.Router();

const { validate, User } = require('../models/user');

const _ = require('lodash');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const username = await User.findOne({username: req.body.username})
    const email = await User.findOne({email: req.body.email})

    if (username || email) return res.status(400).send('A user with this username or email already exists')
        currentUser = new User(_.pick(req.body, ['username', 'email', 'password', 'administrator', 'moderator']));

        const salt = await bcrypt.genSalt(10);
        currentUser.password = await bcrypt.hash(currentUser.password, salt)

        await currentUser.save();

        //creatie authentificatieToken (methode aangeleverd uit User model)
        const token = currentUser.generateAuthentificationToken()

        //toevoegen authentificatieToken aan de header
        res.header('x-auth-token', token).send(_.pick(currentUser, ['_id', 'username', 'email', 'administrator', 'moderator']));
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -administrator -moderator');
    res.send(user)
})

module.exports = router;