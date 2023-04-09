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
  // const { accountNumber, password } = req.body;
  const { user } = req;

  // await User.findOne({
  //   where: {
  //     accountNumber,
  //     password,
  //     status: 'active',
  //   },
  // });

  res.status(201).json({
    status: 'success',
    message: `Login account successfully`,
    user,
  });
});
