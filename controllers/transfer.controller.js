const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
catchAsync;

exports.transfer = async (req, res, next) => {
  const { amount, receiverAccountNumber, senderAccountNumber } = req.body;
  const { receiver, sender } = req;
  await User.findOne({
    where: {
      accountNumber: receiverAccountNumber,
    },
  });
  await User.findOne({
    where: {
      accountNumber: senderAccountNumber,
    },
  });

  if (receiver.accountNumber !== sender.accountNumber) {
    await User.update(
      { amount: receiver.amount + amount },
      { where: { id: receiver.id } }
    );
    await User.update(
      { amount: sender.amount - amount },
      { where: { id: sender.id } }
    );

    const transfer = await Transfer.create({
      amount,
      senderUserId: senderAccountNumber,
      receiverUserId: receiverAccountNumber,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Transfer made successfully',
      transfer,
    });
  }
};
