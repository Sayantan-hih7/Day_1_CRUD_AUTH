const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { authorization } = require('../middleware/authorization')
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/me', authorization, userController.getMe)
module.exports = router