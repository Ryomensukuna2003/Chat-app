const express=require("express");
const bodyParser=require("body-parser");
const mySql=require("mysql");
require("dotenv").config();

const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

// const PORT=process.env.PORT;
const PORT= 5000;
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/Views/index.html');
})

app.listen(PORT,()=>{
    console.log(`Server Listning at ${PORT}`);
})
