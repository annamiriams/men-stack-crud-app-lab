const mongoose = require('mongoose');

const birdSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    family: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// singular here because we're defining what bird is, not what all birds are
const Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;