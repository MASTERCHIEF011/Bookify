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
const sendMail = require('./mail');


const landingRoutes =require('./routes/landing_routes.js')
const homeRoutes =require('./routes/home_routes.js')
const passportConfig=require('./passport-config.js')
const authenticateUser = require('./passport-config.js')
const fetch = require('./database/fetch_data.js')
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, './views')))


app.use(landingRoutes)
app.use(homeRoutes)


// app.use(function(req, res, next){
    
    
// })



app.listen(3000,function(){
    console.log("server has started")
})

