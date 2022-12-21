const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const config = require('config')

const authors = require('./routes/authors')
const series = require('./routes/series')
const comics = require('./routes/comics')
const users = require('./routes/users')
const auth = require('./routes/auth')

require('dotenv').config();

//vermijden dat de applicatie kan starten wanneer er geen geldig token is
if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined');
    process.exit(1)
  }

mongoose.connect('mongodb://127.0.0.1/comicsAPI')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to mongodb: ', err));

app.use(express.json());

app.use('/api/authors', authors);
app.use('/api/series', series);
app.use('/api/comics', comics);
app.use('/api/users', users)
app.use('/api/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port n° ${port}..`));
