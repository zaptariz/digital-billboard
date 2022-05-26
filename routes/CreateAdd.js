const express = require('express');
const AddController = require ('../controller/AddController')
const adminAuth = require('../middleware/admin_auth')

const router = express.Router()

router.post('/create_add', adminAuth, AddController.createadds)

module.exports = router