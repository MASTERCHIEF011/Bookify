var express= require("express");
var app=express();
var path = require('path');
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","html");
app.use(express.static(path.join(__dirname, '/public')));
app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname, "/public","/login.html"));
})
app.post("/",function(req,res){
    var userid=req.body.username;
    var passcode=req.body.password;
    if(userid==="admin" && passcode==="admin"){
        res.redirect("/home");
    }
    else{
        res.redirect("/");
    }
});
app.get("/home",function(req,res){
    res.sendFile(path.join(__dirname, "/public","/home.html"));
   // res.render("../public/home.html");
});
/*app.get("/wrong",function(req,res){
    res.render("../public/login.html");
});*/
app.listen(3000,function(){
    console.log("server has started");
});
