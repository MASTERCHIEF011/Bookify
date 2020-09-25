var express=require("express")
var router=express.Router()
const methodOverride=require('method-override')


router.get('/cart',(req,res)=>{
    res.render('checkout.ejs')
})
router.get('/',(req,res)=>{
    res.render('home.ejs')
})
router.delete('/logout',(req,res) => {
    req.logOut()
    res.redirect('/login')
})

//routes for categories
router.get('/books',(req,res)=>{
    req
})
router.get('/sell',(req,res)=>{
    res.render('sell.ejs')
})
module.exports = router