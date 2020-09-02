const LocalStrategy = require('passport-local').Strategy
const passport=require('passport')
const bcrypt=require('bcrypt')
const fetch= require('./database/fetch_data.js')


  function authenticateUser(username,password,done){
    fetch.fetch_user (username,async function(err,rows){
        if (err){
            return done(err)
        }
        if (rows[0]==null) {
            return done(null,false,{message:" doesn't exsist!"})
        }
        try {
            if(await bcrypt.compare(password,rows[0].password)){
                return done(null,rows)
            }
            else {
                console.log("hi")
                return done(null,false,{message: ' Incorrect!'})
            }
        } catch (e){
            return done(e)
        }
    }
    )
    }

    
    passport.use(new LocalStrategy(authenticateUser))
    passport.serializeUser((rows,done) => done(null,rows[0].id))
    passport.deserializeUser((id,done) => {
        fetch.fetch_id(id,function(err,rows){
            return done(null,rows)
        })
        
    })

 module.exports=authenticateUser