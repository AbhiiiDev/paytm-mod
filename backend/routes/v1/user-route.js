const express=require('express');

const router=express.Router();
const {UserController}=require('../../controller/index');

const {authMiddleware}=require('../../middleware/authMiddleware')

router.get('/',(req,res)=>{
    res.send('yo man this is working');
})

router.post('/',UserController.signup);
router.post('/signin',UserController.signin)
router.put('/',authMiddleware,UserController.updateUser)

module.exports=router;