const express = require("express")
const addController = require('../controller/AddController')
const adminAuth = require('../middleware/admin_auth')

const router = express.Router()

router.delete('/delete', adminAuth, addController.deleteAdd)

module.exports = router