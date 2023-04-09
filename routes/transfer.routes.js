const express = require('express');

const transferController = require('../controllers/transfer.controller');
const {
  handlerTransferError,
} = require('../middlewares/transfers.middlewares');
const { transferValidation } = require('../middlewares/validation.middleware');

const router = express.Router();
router.post(
  '/',
  transferValidation,
  handlerTransferError,
  transferController.transfer
);

module.exports = router;
