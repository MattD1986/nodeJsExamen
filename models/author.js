const Joi = require('joi');
const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    dateOfBirth:{
        type: String,
        required: true
    }
});

const Author = mongoose.model('Authors', authorSchema)

function validateAuthor(author){
    const schema = Joi.object({
        name : Joi.string().min(1).required(),
        dateOfBirth : Joi.string().required()
    })

    return schema.validate(author)
}

exports.authorSchema = authorSchema;
exports.Author = Author;
exports.validate = validateAuthor;