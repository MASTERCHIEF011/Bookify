var express=require('express');
var bodyParser =require('body-parser');
var userroutes =require('./landingPage/routes.js');
var path= require("path");
var app=express();
const passport=require('passport')
const initialisePassport=require('./passport-config');
//initialisePassport(passport)
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, './views')));
app.use(userroutes);
app.listen(3000,function(){
    console.log("server has started");
});
