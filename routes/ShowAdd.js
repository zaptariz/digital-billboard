const express = require("express")
const addController = require('../controller/AddController')
const adminAuth = require('../middleware/admin_auth')

const router = express.Router()

router.get('/show_add', adminAuth, addController.showAdd)

module.exports = router