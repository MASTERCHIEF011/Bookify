var express=require('express');
var bodyParser =require('body-parser');
var userroutes =require('./routes/routes.js');
var path= require("path");
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","html");
app.use(express.static(path.join(__dirname, './public')));
//app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
// app.get("/",function(req,res){
//     res.sendFile(path.join(__dirname, "/public","/login.html"));
// })
// app.post("/",function(req,res){
//     var userid=req.body.username;
//     var passcode=req.body.password;
//     if(userid==="admin" && passcode==="admin"){
//         res.redirect("/home");
//     }
//     else{
//         res.redirect("/");
//     }
// });
// app.get("/home",function(req,res){
//     res.sendFile(path.join(__dirname, "/public","/home.html"));
// });
app.use(userroutes);
app.listen(3000,function(){
    console.log("server has started");
});
