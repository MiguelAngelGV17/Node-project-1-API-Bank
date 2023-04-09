const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.handlerLoginError = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      status: 'active',
    },
  });
  const userPassword = await User.findOne({
    where: {
      accountNumber,
      password,
    },
  });

  if (!user) {
    return next(new AppError(`Account number ${accountNumber} not found`, 404));
  }

  if (!userPassword) {
    return next(new AppError(`The password number is not correct`, 404));
  }
  req.user = user;
  req.userPassword = userPassword;
  next();
});
