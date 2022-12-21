const Joi = require('joi');
const mongoose = require('mongoose');
const { seriesSchema } = require('./series')
const { authorSchema } = require('./author')


const Comic = mongoose.model('comics', new mongoose.Schema({

    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    number:{
        type: Number,
        required: true,
        min: 1
    },
    shortDescription: {
        type: String,
        min: 0
    },
    series:{
        type: seriesSchema,
        required: true
    },
    author: {
        type: authorSchema,
        required: true
    },
    publisher: {
        type: String,
        required: true
    }
}));


function layOutPublisher(reqPublisher){
    const publisher = reqPublisher.charAt(0).toUpperCase() + reqPublisher.slice(1).toLowerCase()
    return publisher
}

function descriptionCheck(reqDescription){
    if(reqDescription.length === 0){
        reqDescription = "no description provided yet"
    }

    return reqDescription
}


function validateComic(comic){
    const schema = Joi.object({
        title : Joi.string().min(1).required(),
        number: Joi.number().min(1).required(),
        shortDescription : Joi.string().min(0),
        seriesId: Joi.objectId().required(),
        authorId: Joi.objectId().required(),
        publisher: Joi.string().required()
    })

    return schema.validate(comic)
}

exports.Comic = Comic;
exports.validate = validateComic;
exports.layOutPublisher = layOutPublisher;
exports.descriptionCheck = descriptionCheck;