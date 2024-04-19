const express = require("express");
require('dotenv').config();
const cors=require('cors');

const app=express();


app.use(cors(
    {
        origin:"*",
        methods:["GET","POST"],
        credentials:true,
        accessControlAllowOrigin:"*"
    }
));
app.use(express.json()); // body-parser

const apiRoutes=require('./routes');

app.get('/',(req,res)=>{
    res.send('yo, backend is wor    king');
})
app.use('/api',apiRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT} `);
});

