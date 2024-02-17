const mySql=require("mysql");

const user=mySql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
})

user.connect((err)=>{
    if(err) console.log(err);
    else{
        console.log("Connected to Database");
    }
})

module.exports=user;