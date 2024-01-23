const express = require("express");
const User = require("../model/User");
const Account = require("../model/Accounts");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("../config/config");
const { createJwtToken } = require("../utils/jwt");
const { signInValidation, updateBody } = require("../utils/validate");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", async (req, res) => {
  const { firstName, lastName } = req.body;
  const { email, password } = await signInValidation.parse(req.body);
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  // check if user already exists
  const userExist = await User.findOne({ email: email });
  if (userExist)
    return res.status(411).json({
      message: "Email already registered",
    });
  else {
    const salt = await bcrypt.genSalt(10);
    var hashedPassword = await bcrypt.hash(password, salt);
    try {
      const newUser = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
      });

      // Save the new user to the database
      const userReg = await newUser.save();
      console.log(userReg._id);

      if (userReg) {
        const userAcc = new Account({
          userId: userReg._id,
          balance: 1 + Math.random() * 10000,
        });
        await userAcc.save();
        res.status(200).json({
          success: true,
          message: "User created successfully",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }
  }
});
router.post("/login", async (req, res) => {
  let { email, password } = await signInValidation.parse(req.body);
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const userExist = await User.findOne({ email: email });
  if (!userExist) {
    return res.status(411).json({
      message: "Account Not Found",
    });
  } else {
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password!",
      });
    } else {
      const token = createJwtToken(
        { userId: userExist._id },
        `${parseInt(config.env.app.expiresIn)}h`
      );
      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({
        success: true,
        message: "Successfully Login",
        token: token,
        userId: userExist._id,
      });
    }
  }
});
router.put("/update", authMiddleware, async (req, res) => {
  const { firstName, lastName, password } = updateBody.parse(req.body);
  if (!firstName || !lastName || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(password, salt);
  const updateUser = await User.updateOne(
    { _id: req.userId },
    {
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    }
  );
  console.log(updateUser);
  if (updateUser) {
    res.json({
      message: "Updated successfully",
    });
  }
});
router.get("/bulk", async (req, res) => {
  try {
    const { filter } = req.query;

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });
    if (users) {
      res.json({
        user: users.map((user) => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        })),
      });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("");
module.exports = router;
