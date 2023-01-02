const express = require('express');
const authController = require('../controllers/authController');
const { body } = require('express-validator');




const router = express.Router();

router.route('/createUser').post(authController.createUser);
router.route('/login').post(authController.loginUser);
router.route('/logout').get(authController.logOutUser);



module.exports = router;