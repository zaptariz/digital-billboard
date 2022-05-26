const express = require('express');
const UserController = require ('../controller/UserController.js')
const adminAuth = require('../middleware/admin_auth')

const router = express.Router();

router.post('/signin', UserController.signin)

module.exports = router