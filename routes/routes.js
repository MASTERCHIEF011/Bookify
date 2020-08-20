var express= require("express");
var router = express.Router();
var path = require('path');
var bodyParser=require("body-parser");

router.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"../public/login.html"));
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
    res.sendFile(path.join(__dirname,"../public/home.html"));
});
module.exports=router;