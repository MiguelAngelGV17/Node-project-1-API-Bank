const express = require('express');

const userController = require('../controllers/user.controller');
const { handlerLoginError } = require('../middlewares/users.middlewares');
const {
  createUserValidation,
  loginValidation,
} = require('../middlewares/validation.middleware');

const router = express.Router();
router.post('/signup', createUserValidation, userController.signup);
router.post('/login', loginValidation, handlerLoginError, userController.login);

module.exports = router;
