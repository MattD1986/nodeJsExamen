const express = require('express');
const router = express.Router();

const { validate, Series } = require('../models/series');
const auth = require('../middleware/auth');
const mod = require('../middleware/mod');
const admin = require('../middleware/admin');
const { Author } = require('../models/author');
const idValidation = require('../middleware/idValidation');


router.get('/', async (req, res) => {
    const series = await Series.find().sort('name');
    res.send(series);
});

router.get('/:id', idValidation,async (req, res) => {
    const series = await Series.findById(req.params.id);

    if  (!series) return res.status(404).send('No series with this ID was found');

    res.send(series);
});

router.get('/name/:name', async (req, res) => {      
    const series = await Series
        .find({ "name": {$regex: `^${req.params.name}`, $options:'i'} })
        .select('name author.name');

    if (series.length === 0) return res.status(404).send('No series by this name found')

    res.send(series);
})

router.get('/author/:name', async (req, res) => {
    const series = await Series
        .find({ "author.name": {$regex: `^${req.params.name}`, $options:'i'} })
        .sort('name')
        .select('name')
    
    if (series.length === 0) return res.status(404).send('No series by this author found')

    res.send(series);    
});


router.post('/', [auth, mod], async (req, res) => {
    
    //error uit validatie opvangen
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);


    const author = await Author.findById(req.body.authorId);
    if (!author) return res.status(400).send('unknown author');

    const series = new Series({
        name: req.body.name,
        author:{
            _id: author._id,
            name: author.name,
            dateOfBirth: author.dateOfBirth
        },
        yearPublished: req.body.yearPublished
    });
    await series.save();

    res.send(series)
});

router.put('/:id', [idValidation, auth, mod], async (req, res) => {
    //error uit validatie opvangen
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const author = await Author.findById(req.body.authorId);
    if (!author) return res.status(400).send('unknown author');

    //callback {new: true} zorgt ervoor dat het ge-update object geretourneerd wordt.
    const series = await Series.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            author:{
                _id: author._id,
                name: author.name,
                dateOfBirth: author.dateOfBirth
            },
            yearPublished: req.body.yearPublished
        }, {new: true});

    if(!series) return res.status(404).send('No series with this ID was found');

    res.send(series)
});

router.delete('/:id', [idValidation, auth, admin], async (req, res) => {
    //findByIdAndRemove = findByIdAndDelete => er wordt aangeraden om findByIdAndDelete te gebruiken
    const series = await Series.findByIdAndDelete(req.params.id)

    if(!series) return res.status(404).send('No series with this ID was found');

    res.send(series)
});

module.exports = router;