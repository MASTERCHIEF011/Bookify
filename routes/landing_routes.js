const express= require("express");
const router = express.Router();
const authenticate_session=require('../public/authenticate_session.js')
const bcrypt=require("bcrypt");
const passport = require("passport");
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'masterchief011',
    database: 'db'
  })

router.get("/",authenticate_session.checkAuthenticated, function(req,res){
    res.render("index.ejs")
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
    //connection.connect()
    try {
       const id=Date.now().toString()
       const hashedPassword= await bcrypt.hash(req.body.password,10)
       const sql="insert into signup_info values('"+req.body.name+"','"+req.body.username+"','"+req.body.email+"','"+req.body.country_code+"','"+req.body.contact+"','"+hashedPassword+"','"+id+"')"
       connection.query(sql,function(err){
           if (err) throw err
           console.log("Successfully saved")
       })
        res.redirect("/login")
    }
     catch {
            res.redirect("/register")
        }
        //connection.end()
});



module.exports=router;