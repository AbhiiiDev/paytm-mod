const express=require('express');

const router=express.Router();
const {AccountController}=require('../../controller');
const { authMiddleware } = require('../../middleware/authMiddleware');

router.get('/',authMiddleware,AccountController.getBalance);

module.exports=router;