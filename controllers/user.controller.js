const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.signup = async (req, res, next) => {
  const { name, password } = req.body;

  const user = await User.create({
    name,
    password,
  });
  res.status(201).json({
    status: 'success',
    message: 'The user has been created successfully',
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { user } = req;

  res.status(201).json({
    status: 'success',
    message: `Login account successfully`,
    user,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  res.status(201).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
