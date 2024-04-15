const express = require("express");
require('dotenv').config();
const cors=require('cors');

const app=express();


app.use(cors());
app.use(express.json()); // body-parser

const apiRoutes=require('./routes');


app.use('/api',apiRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT} `);
});

