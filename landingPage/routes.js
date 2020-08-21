var express= require("express");
var router = express.Router();
var path = require('path');
var bodyParser=require("body-parser");
const bcrypt=require("bcrypt")
const users=[]
router.get("/",function(req,res){
    //res.sendFile(path.join(__dirname,"../public/login.html"));
    res.render("login.ejs")
})
router.get("/register",function(req,res){
    res.render("register.ejs")
});
router.post("/register",async (req,res) =>{
    try {
        const hashedPassword=await bcrypt.hash(req.body.password,10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            username:req.body.username,
            password:hashedPassword
      })
        res.redirect("/")
    }
     catch {
            res.redirect("/register")
        }
        console.log(users)
})
router.post("/",function(req,res){
    var userid=req.body.username;
    var passcode=req.body.password;
    if(userid==="admin" && passcode==="admin"){
        res.redirect("/home");
    }
    else{
        res.redirect("/");
    }
});
router.get("/home",function(req,res){
    //res.sendFile(path.join(__dirname,"../public/home.html"));
    res.render("home.ejs")
});
module.exports=router;
