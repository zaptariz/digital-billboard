//required module
const mongoose = require('mongoose')

//create a schema
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
    date:{
      type:  Date,
      default: Date.now()  
    }
})

//create a model
const model = new mongoose.model('admin_schema',Admin_schema)

//export the model
exports.model = model