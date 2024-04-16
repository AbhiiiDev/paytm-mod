const express=require('express');

const router=express.Router();
const {UserController}=require('../../controller/index');

const {authMiddleware}=require('../../middleware/authMiddleware')



router.post('/',UserController.signup);
router.post('/signin',UserController.signin)
router.put('/',authMiddleware,UserController.updateUser)
router.get('/',UserController.getAllUser)

module.exports=router;