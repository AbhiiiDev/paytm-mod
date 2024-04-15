const express = require("express");

const app=express();


const apiRoutes=require('./routes');


app.use('/api',apiRoutes);

app.listen(3000,()=>{
    console.log('Server is listening ');
});

