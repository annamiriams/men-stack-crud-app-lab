// ------------------------DEPENDENCIES------------------------

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// --------------------------MIDDLEWARE--------------------------

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`); // make sure to update .name
});

// ----------------------------ROUTES----------------------------

// INDUCES

// INDEX
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

// NEW
app.get('/birds/new', async (req, res) => {
    res.render('birds/new.ejs');
});

// DELETE

// UPDATE

// CREATE

// EDIT

// SHOW

// ----------------------------PORTS----------------------------

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});