const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.handlerTransferError = catchAsync(async (req, res, next) => {
  const { amount, receiverAccountNumber, senderAccountNumber } = req.body;

  const receiver = await User.findOne({
    where: {
      accountNumber: receiverAccountNumber,
    },
  });
  const sender = await User.findOne({
    where: {
      accountNumber: senderAccountNumber,
    },
  });
  if (!sender) {
    return next(new AppError('Sender not found', 404));
  }

  if (!receiver) {
    return next(new AppError('Receiver not found', 404));
  }

  if (sender.amount < amount) {
    return next(
      new AppError(
        `Insufficient balance for transfer. Actual amount ${sender.amount} available`,
        400
      )
    );
  }
  if (receiver.accountNumber === sender.accountNumber) {
    return next(new AppError('Sender cannot be the same as receiver', 404));
  }
  req.receiver = receiver;
  req.sender = sender;
  next();
});
