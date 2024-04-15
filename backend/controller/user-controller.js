const { User } = require("../db");
const { z } = require("zod");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config");

const signupBody = z.object({
  username: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

async function signup(req, res) {
  try {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
      return res.status(411).json({
        message: "incorrect inputs",
      });
    }

    const existingUser = await User.findOne({
      username: req.body.username,
    });

    if (existingUser) {
      return res.status(411).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: hashedPassword,
    });

    const userId=user._id;
    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    return res.status(201).json({
        message:"user created ",
        user:user,
        token:token
    })


  } catch {
    return res.status(400).json({
        message:"Unexpected error occured"
    })
  }
}

module.exports = {
  signup,
};
