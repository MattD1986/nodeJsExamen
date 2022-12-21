const express = require('express');
const router = express.Router();

const { Author, validate } = require('../models/author');
const auth = require('../middleware/auth');
const mod = require('../middleware/mod');
const admin = require('../middleware/admin');
const idValidation = require('../middleware/idValidation');



//getAll
router.get('/', async (req, res) => {
    const authors = await Author.find().sort('name');
    res.send(authors);
});

//getByID
router.get('/:id', idValidation, async (req, res) => {
    const author = await Author.findById(req.params.id);
    if  (!author) return res.status(404).send('No author with the given id was found');

    res.send(author);
});

router.post('/', [auth, mod], async (req, res) => {
    //error uit validatie opvangen
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const author = new Author({
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth
    });

    await author.save();

    res.send(author)
});

router.put('/:id', [idValidation, auth, mod], async (req, res) => {
    //error uit validatie opvangen
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //callback {new: true} zorgt ervoor dat het ge-update object geretourneerd wordt.
    const author = await Author.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth
        }, {new: true});

    if(!author) return res.status(404).send('No author with the given id was found');

    res.send(author)
});

router.delete('/:id', [idValidation, auth, admin], async (req, res) => {
    //findByIdAndRemove = findByIdAndDelete => er wordt aangeraden om findByIdAndDelete te gebruiken
    const author = await Author.findByIdAndDelete(req.params.id)
    if(!author) return res.status(404).send('No author with the given id was found');

    res.send(author)
});

module.exports = router;