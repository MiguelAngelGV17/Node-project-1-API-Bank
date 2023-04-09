const { body, validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('The name field cannot be empty'),
  body('password')
    .notEmpty()
    .withMessage('The password field cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The password must be as least 6 characters'),
  validateFields,
];

exports.loginValidation = [
  body('accountNumber')
    .notEmpty()
    .withMessage('The account number field cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The account number must be as least 6 characters'),
  body('password')
    .notEmpty()
    .withMessage('The password field cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The password must be as least 6 characters'),
  validateFields,
];

exports.deleteValidation = [
  body('id')
    .isNumeric()
    .withMessage('The id endpoint must be a number')
    .isLength({ min: 1 })
    .withMessage('The id endpoint must be as least 1 character'),
];

exports.transferValidation = [
  body('amount')
    .notEmpty()
    .withMessage('The amount field cannot be empty')
    .isNumeric()
    .withMessage('The amount only must be number types'),
  body('senderAccountNumber')
    .notEmpty()
    .withMessage('The sender account number field cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The sender account number must be as least 6 characters'),
  body('receiverAccountNumber')
    .notEmpty()
    .withMessage('The receiver account number field cannot be empty')
    .isLength({ min: 6 })
    .withMessage('The receiver account number must be as least 6 characters'),
  validateFields,
];
