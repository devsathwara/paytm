const express = require("express");
const User = require("../model/User");
const mongoose = require("mongoose");
const Account = require("../model/Accounts");
const router = express.Router();
const config = require("../config/config");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const account = await Account.findOne({ userId: userId });

    if (account) {
      return res.status(200).json({
        balance: account.balance,
      });
    } else {
      return res.status(401).send("No account found for this user.");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();

    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
