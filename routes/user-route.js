const express = require('express');

const usersControllers = require('../controlers/users-controlers')

const router = express.Router();


router.get ('/', usersControllers.getUsers);

router.post ('/signup', usersControllers.signup);

router.post ('/login', usersControllers.login)




module.exports = router;