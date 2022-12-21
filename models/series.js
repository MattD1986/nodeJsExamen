const Joi = require('joi');
const mongoose = require('mongoose');
const { authorSchema } = require('../models/author');

const seriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    yearPublished:{
        type: String,
        minlength: 4,
        maxlength: 4,
        required: true
    },
    author: {
        type: authorSchema,
        required: true
    }
});

const Series = mongoose.model('Series', seriesSchema);

function validateSeries(series){
    const schema = Joi.object({
        name : Joi.string().min(1).required(),
        yearPublished : Joi.string().min(4).max(4).required(),
        authorId: Joi.objectId().required()
    })

    return schema.validate(series)
}

exports.seriesSchema = seriesSchema
exports.Series = Series;
exports.validate = validateSeries;