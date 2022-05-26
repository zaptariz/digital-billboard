const express = require('express')
const UserController = require ('../controller/UserController.js')


const router = express.Router();

router.post('/signup',UserController.signup)

module.exports = router