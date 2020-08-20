var express=require('express');
var bodyParser =require('body-parser');
var userroutes =require('./routes/routes.js');
var path= require("path");
var app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","html");
app.use(express.static(path.join(__dirname, './public')));
app.use(userroutes);
app.listen(3000,function(){
    console.log("server has started");
});
