const express= require("express");
const router = express.Router();
const authenticate_session=require('../public/authenticate_session.js')
const bcrypt=require("bcrypt");
const passport = require("passport");
const initializePassport=require('../passport-config')
const newuser =require('../public/database.js')
const users=newuser.users

router.get("/",authenticate_session.checkAuthenticated, function(req,res){
    res.render("home.ejs")
});


router.get('/login',authenticate_session.checkNotAuthenticated,(req,res)=>{
    res.render('login.ejs')
});


router.post("/login",authenticate_session.checkNotAuthenticated, passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash:true    
}));


router.get("/register",authenticate_session.checkNotAuthenticated,function(req,res){
    res.render("register.ejs")
});


router.post("/register",authenticate_session.checkNotAuthenticated,async (req,res) =>{
    try {
        
       const hashedPassword= await bcrypt.hash(req.body.password,10)
        users.push({
            id:Date.now().toString(),
            name:req.body.name,
            username:req.body.username,
            password:hashedPassword
      })
        res.redirect("/login")
    }
     catch {
            res.redirect("/register")
        }
        console.log(users)
});



module.exports=router;