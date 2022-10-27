const express = require('express');
const { connections } = require('mongoose');
const mongoose = require('mongoose');
const app = express();
const routes = require('./api/routes');

app.use(express.json());
app.use('/api', routes);

app.listen(3000, () => {
    console.log('Server started at $(3000)')
})

require('dotenv').config();

mongoose.connect(process.env.DATABASE_URI);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('database connected');
})