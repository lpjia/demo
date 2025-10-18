const express = require('express')

const UserController = require('../controller/UserController')

const router = express.Router()

router.post('/login/:id', UserController.getName)

module.exports = router