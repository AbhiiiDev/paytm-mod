const { Account, User } = require("../db");
const {mongoose}=require('mongoose');


async function getBalance(req, res) {
  const account = await Account.findOne({
    userId: req.userId,
  });

  return res.status(200).json({ balance: account.balance });
}

async function transferMoney(req, res) {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { to, amount } = req.body;

  const account = await Account.findOne({
    userId: req.userId,
  }).session(session);

  if (!account || account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({
    userId: to,
  }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "account does not exists",
    });
  }
  await Account.updateOne(
    {
      userId: req.userId,
    },
    {
      $inc: {
        balance: -amount,
      },
    }
  ).session(session);
  await Account.updateOne(
    {
      userId: to,
    },
    {
      $inc: {
        balance: amount,
      },
    }
  ).session(session);
  await session.commitTransaction();
  res.status(200).json({
    message: "Money transferred successfully",
  });
}
module.exports = {
  getBalance,
  transferMoney,
};
