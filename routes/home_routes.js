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
        res.render('wishlist.ejs',{userData: rows})
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
    console.log('aur batao ', Data);

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
    req
})
router.get('/sell',(req,res)=>{
    res.render('sell.ejs')
})
module.exports = router