//Required Modules and Packages
const mongoose = require('mongoose')
const express = require('express')
const signUp = require('./routes/SignUp')
const signIn = require('./routes/SignIn')
const createAdd = require('./routes/CreateAdd')
const viewAdd = require('./routes/ShowAdd')
const updateAdd = require('./routes/UpdateAdd')
const deleteAdd = require('./routes/DeleteAdd')
//Create a application to use express framework
const application = express();
application.use(express.json())

//port expose on localhost
application.listen(19090, (err, data) => {
    console.log("\n\n                            SERVER UP");
})

//connectivity for mongodb with default port
const connect = () => {
    try {
        mongoose.connect('mongodb://localhost/NewDB', (err, data) => {
            console.log("                            DB CONNECTED                 \n")
        })
    } catch (error) {
        console.log("sdfsf", error)
    }
}
// Invoke DB connection
connect();

//Api routes exposed
application.use(signIn)
application.use(signUp)
application.use(createAdd)
application.use(viewAdd)
application.use(updateAdd)
application.use(deleteAdd)