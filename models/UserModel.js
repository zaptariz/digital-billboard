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
    role: {
        type: Number,
        required: true
    }
})

//create a models
const model = new mongoose.model('admin_schema', Admin_schema)

//export the model
exports.model = model

// Virtual for user's full name if user have first name and last name
// UserSchema
// 	.virtual("fullName")
// 	.get(function () {
// 		return this.firstName + " " + this.lastName;
// 	});

// module.exports = mongoose.model("User", UserSchema);