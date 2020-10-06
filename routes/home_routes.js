var express=require("express")
var router=express.Router()
const methodOverride=require('method-override')
const fetch=require('../database/fetch_data.js')


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
router.get('/wishlist',(req,res)=>{
    const username=req.user[0].user_id
    fetch.fetch_wishlist(username,function(err,rows){
        res.render('wishlist.ejs',{userData: rows})
    })
    
})
router.post('/wishlist_add_item',(req,res)=>{
    const username=req.user[0].user_id
    const item_name=req.body.item_name
    fetch.add_to_wishlist(username,item_name,function(err,rows){
        res.render('wishlist.ejs',{userData: rows})
    })
})


//routes for categories
router.get('/books',(req,res)=>{
    req
})
router.get('/sell',(req,res)=>{
    res.render('sell.ejs')
})
module.exports = router