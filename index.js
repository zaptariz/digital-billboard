//Required Modules and Packages
const mongoose = require('mongoose')
const express = require('express')
const router = require('./router')

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
        mongoose.connect('mongodb://localhost', (err, data) => {
            console.log("                            DB CONNECTED                 \n")
        })
    } catch (error) {
        console.log("sdfsf", error)
    }
}
// Invoke DB connection
connect();

//expose router
application.use(router)