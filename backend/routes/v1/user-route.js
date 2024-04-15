const express=require('express');

const router=express.Router();

router.get('/',(req,res)=>{
    res.send('yo man this is working');
})

module.exports=router;