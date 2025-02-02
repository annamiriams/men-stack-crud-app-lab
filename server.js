// ------------------------DEPENDENCIES------------------------

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
// requiring path for styling
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// --------------------------MIDDLEWARE--------------------------

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`); // make sure to update .name
});

const Bird = require('./models/bird.js');

// still just accepting that thes lines of code are needed but still not understanding why...
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

// 'middleware to serve static files from the directory'
app.use(express.static(path.join(__dirname, "public")));

// ----------------------------ROUTES----------------------------

// INDUCES

// HOME / LANDING PAGE
// /
app.get('/', async (req, res) => {
    res.render('index.ejs');
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
app.get('/birds/new', (req, res) => {
    res.render('birds/new.ejs');
});

// DELETE: delete a bird by id
// /birds/:birdId
app.delete('/birds/:birdId', async (req, res) => {
    await Bird.findByIdAndDelete(req.params.birdId);
    res.redirect('/birds');
});

// UPDATE: update a bird by id
// /birds/:birdId
// pairs with EDIT route (EDIT collects data and UPDATE processes data)
app.put('/birds/:birdId', async (req, res) => {
    await Bird.findByIdAndUpdate(req.params.birdId, req.body);
    res.redirect(`/birds/${req.params.birdId}`);
    // res.send('testing update');
});

// CREATE: create a new bird (how is this different than new?)
// /birds
app.post('/birds', async (req, res) => {
    // console.log(req.body);
    await Bird.create(req.body);
    res.redirect('/birds');
});

// EDIT: show a form to edit an existing bird
// /birds/:birdId/edit
// pairs with UPDATE route (EDIT collects data and UPDATE processes data)
app.get('/birds/:birdId/edit', async (req, res) => {
    const foundBird = await Bird.findById(req.params.birdId);
    res.render('birds/edit.ejs', { bird: foundBird } );
});

// SHOW: display a bird by id
// /birds/:birdId
app.get("/birds/:birdId", async (req, res) => {
    const foundBird = await Bird.findById(req.params.birdId);
    res.render('birds/show.ejs', { bird: foundBird });
});

// ----------------------------PORTS----------------------------

app.listen(3000, () => {
    console.log('Listening on port 3000.');
});

// ----------------------------QUESTIONS----------------------------


// ID syntax in edit.ejs and new.ejs files

// lots of bugs to figure out in edit.ejs