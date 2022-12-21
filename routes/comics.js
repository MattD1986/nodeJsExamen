const express = require('express');
const router = express.Router();

const { Comic, validate, descriptionCheck, layOutPublisher } = require('../models/comic');
const auth = require('../middleware/auth');
const mod = require('../middleware/mod');
const admin = require('../middleware/admin');
const { Series } = require('../models/series');
const { Author } = require('../models/author');
const idValidation = require('../middleware/idValidation');


//getAll
router.get('/', async (req, res) => {
    const comics = await Comic.find().sort('number');
    res.send(comics);
});

//getByID  --> nazien, want hier moet je strips kunnen zoeken op reeks bvb
router.get('/:id', idValidation,async (req, res) => {
    const comic = await Comic.findById(req.params.id);

    if  (!comic) return res.status(404).send('No comic found with the given Id');

    res.send(comic);
});

router.get('/title/:title', async (req, res) => {      
    const comicByName = await Comic
        .find({ "title": {$regex: `^${req.params.title}`, $options:'i'} })
        .select('number title shortDescription publisher series.name');

    if  (comicByName.length === 0) return res.status(404).send('No comic found with this title');

    res.send(comicByName);
})

router.get('/series/:name', async (req, res) => {      
    const comicsBySeries = await Comic
        .find({ "series.name": {$regex: `^${req.params.name}`, $options:'i'} })
        .sort('number')
        .select('number title');

    if  (comicsBySeries.length === 0) return res.status(404).send('No comics found for this series');

    res.send(comicsBySeries);
})

router.get('/publisher/:name', async (req, res) => {      
    const comicsByPublisher = await Comic
        .find({ "publisher": {$regex: `^${req.params.name}`, $options: 'i'} })
        .sort('series.name')
        .select('number title series.name');;

    if  (comicsByPublisher.length === 0) return res.status(404).send('No comics found for this publisher');

    res.send(comicsByPublisher);
})


router.post('/', [auth, mod], async (req, res) => {
    
    //error uit validatie opvangen
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const series = await Series.findById(req.body.seriesId);
    if (!series) return res.status(400).send('unknown series');

    const author = await Author.findById(req.body.authorId);
    if (!author) return res.status(400).send('unknown author');
    
    const comic = new Comic({
        title: req.body.title,
        number: req.body.number,
        shortDescription: descriptionCheck(req.body.shortDescription),
        series:{
            _id: series._id,
            name: series.name,
            author:{
                _id: author._id,
                name: author.name,
                dateOfBirth: author.dateOfBirth
            },
            yearPublished: series.yearPublished
        },
        author:{
            _id: author._id,
            name: author.name,
            dateOfBirth: author.dateOfBirth
        },
        publisher: layOutPublisher(req.body.publisher)
    });

    await comic.save();

    res.send(comic)
});

router.put('/:id', [idValidation, auth, mod], async (req, res) => {
    //error uit validatie opvangen
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    const series = await Series.findById(req.body.seriesId);
    if (!series) return res.status(400).send('unknown series');

    const author = await Author.findById(req.body.authorId);
    if (!author) return res.status(400).send('unknown author');

    //callback {new: true} zorgt ervoor dat het ge-update object geretourneerd wordt.
    const comic = await Comic.findByIdAndUpdate(req.params.id,
        {
            title: req.body.title,
            number: req.body.number,
            shortDescription: descriptionCheck(req.body.shortDescription),
            series:{
                _id: series._id,
                name: series.name,
                author:{
                    _id: author._id,
                    name: author.name,
                    dateOfBirth: author.dateOfBirth
                },
                yearPublished: series.yearPublished
            },
            author:{
                _id: author._id,
                name: author.name,
                dateOfBirth: author.dateOfBirth
            },
            publisher: layOutPublisher(req.body.publisher)
        }, {new: true});

    if(!comic) return res.status(404).send('No comic found with the given Id');

    res.send(comic)
});

router.delete('/:id', [idValidation, auth, admin], async (req, res) => {
    //findByIdAndRemove = findByIdAndDelete => er wordt aangeraden om findByIdAndDelete te gebruiken
    const comic = await Comic.findByIdAndDelete(req.params.id)

    if(!comic) return res.status(404).send('No comic found with the given Id');

    res.send(comic)
});

module.exports = router;