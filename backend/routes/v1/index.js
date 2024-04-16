const express=require('express');

const router=express.Router();

const userRoute=require('./user-route')
const accountRoute=require('./account-route')

router.use('/user',userRoute)
router.use('/account',accountRoute)

module.exports=router;
