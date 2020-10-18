var express=require("express")
var router=express.Router()
const methodOverride=require('method-override')
const fetch=require('../database/fetch_data.js')
const sendMail = require('../mail');


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
        result=Object.values(JSON.parse(JSON.stringify(rows)))
        res.render('wishlist.ejs',{userData: result})
    })
    
})
router.post('/wishlist_add_item',(req,res)=>{
    const username=req.user[0].user_id
    const item_name=req.body.item_name
    fetch.add_to_wishlist(username,item_name)
    res.redirect("/wishlist")
})
router.delete('/delete_from_wishlist/:item_id',(req,res)=>{
    const item_id=req.params.item_id
    console.log(item_id,"hello")
    fetch.delete_from_Wishlist(item_id)
        res.redirect("/wishlist")

})

router.post('/email', (req, res) => {
    // res.sendFile(path.join(__dirname + '/contact-us.html'));
    //TODO
    //send email here
    const Data={
     name :req.body.name,
    email:req.body.email,
    subject:req.body.subject,
    text:req.body.text
};

    sendMail(Data.name, Data.email, Data.subject, Data.text, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.redirect("/contact_us")
            res.status({ message: 'Email sent!!!' });
        }
    });
    // res.json({ message: 'Message received!!!' })
});

//routes for categories
router.get('/books',(req,res)=>{
    fetch.fetch_all_books(function(err,rows){
        result=Object.values(JSON.parse(JSON.stringify(rows)))
        const flag=0
        res.render('category.ejs',{userData: result,flag : flag})
    })
})
router.get('/magazines',(req,res)=>{
    fetch.fetch_all_magazines(function(err,rows){
        console.log(rows,"check this")
        result=Object.values(JSON.parse(JSON.stringify(rows)))
        const flag=1
        res.render('category.ejs',{userData: result,flag : flag})
    })
})
router.get('/stamps',(req,res)=>{
    fetch.fetch_all_stamps(function(err,rows){
        result=Object.values(JSON.parse(JSON.stringify(rows)))
        const flag=2
        res.render('category.ejs',{userData: result,flag : flag})
    })
})
router.get('/sell',(req,res)=>{
    res.render('sell.ejs')
})

router.post('/add_item_to_inventory',(req,res)=>{
    const username=req.user[0].user_id
   const data= fetch.add_to_inventory(req,username)
   res.redirect('/listings')
})

router.delete('/delete_from_inventory/:item_id',(req,res)=>{
    const item_id=req.params.item_id
    console.log(item_id,"lallu")
    fetch.delete_from_inventory(item_id)
        res.redirect("/listings")

})

router.get('/listings',(req,res)=>{
    const username=req.user[0].user_id
    fetch.fetch_listing(username,function(err,rows){
        result=Object.values(JSON.parse(JSON.stringify(rows)))
       res.render('listing.ejs',{userData: result})
    })
    
})
module.exports = router