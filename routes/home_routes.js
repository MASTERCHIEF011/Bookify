var express=require("express")
var router=express.Router()
const methodOverride=require('method-override')
router.get("/home",function(req,res){
    
})
router.delete('/logout',(req,res) => {
    req.logOut()
    res.redirect('/login')
})
module.exports = router