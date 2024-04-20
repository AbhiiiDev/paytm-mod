const { User, Account } = require("../db");
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

const signinBody = z.object({
  username: z.string().email(),
  password: z.string(),
});

const updateBody = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
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

    const userId = user._id;

    await Account.create({
      userId,
      balance:1+ Math.random()*1000
    })


    const token = jwt.sign(
      {
        userId,
      },
      JWT_SECRET
    );
    return res.status(201).json({
      message: "user created ",
      user: user,
      token: token,
    });
  } catch {
    return res.status(400).json({
      message: "Unexpected error occured",
    });
  }
}

async function signin(req, res) {
  try {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
      return res.status(400).json({
        message: "invalid input",
      });
    }

    const userExist = await User.findOne({ username: req.body.username });

    if (!userExist) {
      return res
        .status(400)
        .json({ message: "User you requested does not exists" });
    }

    const hashedPassword = userExist.password;

    const compareResult = await bcrypt.compare(
      req.body.password,
      hashedPassword
    );
    if (!compareResult) {
      return res.json({ message: "Incorrect password entered" });
    }

    const token= jwt.sign({
      userId:userExist._id
    },JWT_SECRET);

   


    return res.status(200).json({
      message: "Successfully signed up",
      token: token,
    });

  } catch (error) {
    return res.status(404).json({ message: "internal server error" });
  }
}

async function updateUser(req, res) {
  try {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      return res.json({ message: "invalid input" });
    }

    const bodyData = {};

    await User.updateOne(
      {
        _id: req.userId,
      },
      bodyData
    );

    return res.json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: "Interal server error" });
  }
}

async function getAllUser(req, res) {
  try {
    const filter = req.query.filter.toLowerCase() || "";

    const users = await User.find({
      $or: [
        {
          firstName: {
            "$regex": filter,
          },
        },
        {
          lastName: {
           "$regex": filter,
          },
        },
      ],
    });

    if (!users) {
      return res.json({ message: "no user is present" });
    }

    return res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (error) {
    return res.status(400).json({
      message: "Internal server error",
    });
  }
}

async function getUserDetail(req,res)
{
  const userId=req.userId;
  console.log(userId)

  const user=await User.findOne({
    _id:userId
  })
  
  if(!user)
  {
    return res.json({
      message:"Can't find user, some error occured"
    })
  }

  if(user)
  {
    return res.status(200).json({
firstName:user.firstName,
lastName:user.lastName
    })
  }


}

module.exports = {
  signup,
  signin,
  updateUser,
  getAllUser,
  getUserDetail
};
