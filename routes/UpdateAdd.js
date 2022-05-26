const express = require("express")
const addController = require('../controller/AddController')
const adminAuth = require('../middleware/admin_auth')

const router = express.Router()

router.patch('/update_ads/:id', adminAuth, addController.updateAdd)

module.exports = router