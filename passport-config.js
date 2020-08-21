const LocalStrategy = require('passport-local').Strategy
function initialise(passport){
    passport.use(new LocalStrategy({}))
}