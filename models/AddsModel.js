//required module
const mongoose = require('mongoose')

//Schema for advertisements
const advertisements = new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: Buffer
    },
    starttime: {
        type: Date,
        required: true
    },
    endtime: {
        type: Date,
        required: true
    },
    is_active: {
        type: Boolean,
        default: true
    }
})

//create a model
const adds = new mongoose.model('adds', advertisements)

//export the model
exports.adds = adds