const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
       
       const decoded= jwt.verify(token,JWT_SECRET);
       req.userId=decoded.userId;
        next();
  } catch {
    return res.status(401).json({message:'auth failed'});
  }
};

module.exports={
    authMiddleware
}