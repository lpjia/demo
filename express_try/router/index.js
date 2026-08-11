const express = require('express')

const UserController = require('../controller/UserController')

const router = express.Router()

router.post('/login/:id', UserController.getName)
/* router.post('/home', UserController.home) */

module.exports = router