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

const Bird = require('./models/bird.js');

// still just accepting that this line of code is needed and not understanding why/what it does...
app.use(express.urlencoded({ extended: false }));

// ----------------------------ROUTES----------------------------

// INDUCES

// / home page
app.get('/', (req, res) => {
    res.render('index.ejs')
});

// INDEX: list of all birds
// /birds
app.get('/birds', async (req, res) => {
    const allBirds = await Bird.find();
    // console.log(allBirds);
    // pass the allBirds data from our database under a key called bird to the EJS file
    res.render('birds/index.ejs', { birds: allBirds });
});

// NEW: show a form to create a new bird (how is this different than create?)
// /birds/new
app.get('/birds/new', async (req, res) => {
    res.render('birds/new.ejs');
});

// DELETE: delete a bird by id
// /birds/:id
// but how are we actually accessing this???
app.delete('/birds/:id', async (req, res) => {
    const deletedBird = await Bird.findByIdAndDelete(id);
    console.log('Deleted bird: ', deletedBird);
});

// UPDATE: update a bird by id
// /birds/:id

// CREATE: create a new bird (how is this different than new?)
// /birds
app.post('/birds', async (req, res) => {
    // console.log(req.body);
    await Bird.create(req.body);
    res.redirect('/birds');
});

// EDIT: show a form to edit an existing bird
// /birds/:id/edit

// SHOW: display a bird by id
// /birds/:id

// ----------------------------PORTS----------------------------

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});