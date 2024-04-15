const express=require('express');

const router=express.Router();
const {UserController}=require('../../controller/index');

router.get('/',(req,res)=>{
    res.send('yo man this is working');
})

router.post('/',UserController.signup);
router.post('/signin',UserController.signin)

module.exports=router;