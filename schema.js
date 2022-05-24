//required module
const mongoose = require('mongoose')

//Schema for user registration/login
const Admin_schema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },

    // here, 1 == user, 2 == admin
    role: {
        type: Number,
        required: true
    }
})

//Schema for advertisements
const advertisements = new mongoose.Schema({
    title: {
        type: String,
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

//Schema for login Token
const token = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'admin_schema'
    },
    token: {
        type: String, index: true
    },
    is_deleted: {
        type: Boolean, default: false
    }
})

//create a models
const model = new mongoose.model('admin_schema', Admin_schema)
const ads = new mongoose.model('adds', advertisements)
const usertoken = new mongoose.model('usertoken', token)

//export the model
exports.model = model
exports.ads = ads
exports.usertoken = usertoken