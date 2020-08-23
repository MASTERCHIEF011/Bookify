if(process.env.NODE_ENV!=='production'){
    require('dotenv').config()
}
const express=require('express')
const app=express()
const bodyParser =require('body-parser')
const flash =require('express-flash')
const session=require('express-session')
const passport=require('passport')
const path= require("path")
const methodOverride=require('method-override')
const landingroutes =require('./routes/landing_routes.js');
const homeroutes =require('./routes/home_routes.js');
const authenticate_session=require('./public/authenticate_session.js')
const initializePassport=require('./passport-config')
const newuser =require('./public/database.js')
initializePassport(
    passport,
    username => users.find(user =>user.username===username),
    id=>users.find(user=>user.id===id)
    ) 
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, './views')));
app.use(landingroutes)
app.use(homeroutes)
const users=newuser.users

app.listen(3000,function(){
    console.log("server has started")
})

