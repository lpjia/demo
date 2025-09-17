const express = require('express')
const router = express.Router()

const UserController = require('../controller/UserController')

router.post('/login/:id', UserController.getName)

module.exports = router