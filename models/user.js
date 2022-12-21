const Joi = require('joi');
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        minlength: 4,
        maxlength: 20
    },
    email:{
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    password:{
        type: String,
        required: true,
        minlength: 8
    },
    administrator:{
        type: Boolean,
        default: false
    },
    moderator:{
        type: Boolean,
        default: false
    }
});

//information Expert Principle --> userObject is verantwoordelijk voor de aanmaak van het token
userSchema.methods.generateAuthentificationToken = function(){
    const token = jwt.sign({_id: this._id, administrator: this.administrator, moderator: this.moderator}, config.get('jwtPrivateKey'));

    return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user){
    const schema = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        email: Joi.string().email().min(5).required(),
        password: Joi.string().min(8).required(),
        administrator: Joi.boolean(),
        moderator: Joi.boolean()
    })

    return schema.validate(user);
};

exports.User = User;
exports.validate = validateUser;