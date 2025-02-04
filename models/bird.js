const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    family: String,
    description: String,
});

// singular here because we're defining what bird is, not what all birds are
const Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;