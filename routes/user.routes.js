const express = require('express');

const userController = require('../controllers/user.controller');
const {
  handlerLoginError,
  handlerDeleteError,
} = require('../middlewares/users.middlewares');
const {
  createUserValidation,
  loginValidation,
  deleteValidation,
} = require('../middlewares/validation.middleware');

const router = express.Router();
router.post('/signup', createUserValidation, userController.signup);
router.post('/login', loginValidation, handlerLoginError, userController.login);

router
  .route('/:id')
  .delete(deleteValidation, handlerDeleteError, userController.delete);

module.exports = router;
