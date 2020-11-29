const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'db',
    multipleStatements: true
  })


  module.exports={
    fetch_user :function(user,callback){
        const query="select * from profile_login where user_id = '"+user+"'"
         connection.query(query,(err,rows)=>{
             if(!err){
            callback(null,rows)
          }
            else
            callback(true,null)
        })
    },
    fetch_id :function(id,callback){
      const query="select * from profile_login where id = '"+id+"'"
       connection.query(query,(err,rows)=>{
           if(!err){
          callback(null,rows)
        }
          else
          callback(true,null)
      })
  },
  fetch_all_books :function(callback){
    const query="select * from inventory inner join book_details_key using(item_id) inner join book_details_info using(isbn)"
    connection.query(query,(err,rows)=>{
      if (!err) {
        callback(null,rows)
      }
      else
      callback(true,null)
    })

  },
  fetch_all_magazines :function(callback){
    const query="select * from inventory inner join magazine_details using(item_id)"
    connection.query(query,(err,rows)=>{
      if (!err) {
        callback(null,rows)
      }
      else
      callback(true,null)
    })

  },
  fetch_all_stamps :function(callback){
    const query="select * from inventory inner join stamp_details using(item_id)"
    connection.query(query,(err,rows)=>{
      if (!err) {
        callback(null,rows)
      }
      else
      callback(true,null)
    })

  },
  fetch_wishlist :function(username,callback){
    
    const query="select buyer_id,item_id,item_name from wishlist where buyer_id=(Select buyer_id from buyer_profile where user_id='"+username+"')"
    connection.query(query,(err,rows)=>{
      if (!err) {
        callback(null,rows)
      }
      else
      callback(true,null)
    })
  },
  add_to_wishlist :function(username,item_name){
    const query="select buyer_id from buyer_profile where user_id='"+username+"'"
    const query1="select item_id from inventory where item_name='"+item_name+"'"
    connection.query(query,(err,rows)=>{
      if (!err) {
        connection.query(query1,(err,rows1)=>{
          if(!err){
            const query2="insert into wishlist values('"+rows[0].buyer_id+"','"+rows1[0].item_id+"','"+item_name+"')"
            connection.query(query2,(err)=>{
              if(!err){
                    console.log("Successfully added")
                  }
                })
                
              }
            })
          }
        })
      
    

    console.log(item_name)
    //const query="select "
  },
  delete_from_Wishlist :function(item_id){
    console.log(item_id)
    const query="delete from wishlist where item_id='"+item_id+"'"
    connection.query(query,(err)=>{
      if(!err){
        console.log("Deleted Successfully")
      }
    })
  },
  delete_from_inventory :function(item_id){
    const query="delete from inventory where item_id='"+item_id+"'"
    connection.query(query,(err)=>{
      if(!err){
        console.log("Deleted Successfully")
      }
    })
  },
  add_to_inventory :function(req,username){
    if(req.body.item_type == "Book"){
      const data={
          item_id : req.body.item_id,
          item_name : req.body.item_name,
          item_type : req.body.item_type,
          quantity : req.body.quantity,
          item_condition : req.body.item_condition,
          price : req.body.price,
          isbn : req.body.isbn,
          genre : req.body.genre,
          author : req.body.author,
          publisher : req.body.publisher
      }
      const query2="insert into book_details_info values('"+data.isbn+"','"+data.author+"','"+data.genre+"','"+data.publisher+"')"
      const query="insert into inventory values('"+data.item_id+"','"+data.item_name+"','"+data.item_type+"','"+data.quantity+"','"+data.item_condition+"','"+data.price+"')"
      const query1="insert into book_details_key values('"+data.item_id+"','"+data.isbn+"')"
      const query3="insert into add_to(item_id,seller_id) select '"+data.item_id+"', t.seller_id from seller_profile t where t.user_id='"+username+"'; "
      connection.query(query,(err)=>{
        if(!err){
          connection.query(query1)
          connection.query(query2)
          connection.query(query3)
        }
      })
      return data
  }
  else if(req.body.item_type == "Magazine"){
      const data={
          item_id : req.body.item_id,
          item_name : req.body.item_name,
          item_type : req.body.item_type,
          quantity : req.body.quantity,
          item_condition : req.body.item_condition,
          price : req.body.price,
          genre : req.body.genre,
          edition : req.body.edition,
          release : req.body.release
      }
      const query1="insert into magazine_details values('"+data.item_id+"','"+data.genre+"','"+data.edition+"','"+data.release+"')"
      const query="insert into inventory values('"+data.item_id+"','"+data.item_name+"','"+data.item_type+"','"+data.quantity+"','"+data.item_condition+"','"+data.price+"')"
      const query2="insert into add_to(item_id,seller_id) select '"+data.item_id+"', t.seller_id from seller_profile t where t.user_id='"+username+"'; "
      connection.query(query,(err)=>{
        if(!err){
          connection.query(query1)
          connection.query(query2)
        }
      })
      return data
  }
  else{
      const data={
          item_id : req.body.item_id,
          item_name : req.body.item_name,
          item_type : req.body.item_type,
          quantity : req.body.quantity,
          item_condition : req.body.item_condition,
          price : req.body.price,
          country : req.body.country,
          mfd_year : req.body.mfd_year
      }
      const query1="insert into stamp_details values('"+data.item_id+"','"+data.country+"','"+data.mfd_year+"')"
      const query="insert into inventory values('"+data.item_id+"','"+data.item_name+"','"+data.item_type+"','"+data.quantity+"','"+data.item_condition+"','"+data.price+"')"
      const query2="insert into add_to(item_id,seller_id) select '"+data.item_id+"', t.seller_id from seller_profile t where t.user_id='"+username+"'; "
      connection.query(query,(err)=>{
        if(!err){
          connection.query(query1)
          connection.query(query2)
          
        }
      })
      return data
  }

  },
  fetch_listing :function(username,callback){
    const query="select * from inventory where item_id in (select item_id from add_to where seller_id=(select seller_id from seller_profile where user_id='"+username+"'))"
    connection.query(query,(err,rows)=>{
      if (!err) {
        console.log(rows,"listings")
        callback(null,rows)
      }
      else
      callback(true,null)
    })
  },

populate_seller_buyer: function(req){
  var data={
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    email:req.body.email,
    user_id:req.body.username,
    street:req.body.address,
    city:req.body.city,
    zip:req.body.zip,
    contact:req.body.contact,
    gender:req.body.gender,
    dob:req.body.dob
  }
  
  const query="call conv1('"+data.first_name+"','"+data.last_name+"','"+data.email+"','"+data.user_id+"','"+data.street+"','"+data.city+"','"+data.zip+"','"+data.contact+"','"+data.gender+"','"+data.dob+"');"
  const query1="call conv2('"+data.first_name+"','"+data.last_name+"','"+data.email+"','"+data.user_id+"','"+data.street+"','"+data.city+"','"+data.zip+"','"+data.contact+"','"+data.gender+"','"+data.dob+"');"
  connection.query(query,(err)=>{
    if(!err){
      connection.query(query1)
      console.log("ok done")
    }
    else{
      throw err
    }
  })
},

add_to_cart: function(username,item_id){
  const query="select buyer_id from buyer_profile where user_id='"+username+"'"
  const query1="select item_name,price from inventory where item_id='"+item_id+"'"
  
  connection.query(query,(err,rows)=>{
    if(!err){
      console.log(rows,"ppppp")
      connection.query(query1,(err,rows1)=>{
        if(!err){
          console.log(rows1,"bbbbb")
          const query2="insert into cart(buyer_id,item_id,item_name,quantity,cost) values('"+rows[0].buyer_id+"','"+item_id+"','"+rows1[0].item_name+"',1,'"+rows1[0].price+"')"
        connection.query(query2)
      }
      // else{
      //   callback(true,null)
      // }
      })
    }
  })
},
display_cart_item: function(username,callback){
  const query="select cart_id,item_name,cost from cart where buyer_id=(select buyer_id from buyer_profile where user_id='"+username+"')"
  connection.query(query,(err,rows)=>{
    if(!err){
      callback(null,rows)
    }
    else{
      callback(true,null)
    }
  })
},

delete_from_cart: function(cart_id){
  const query="delete from cart where cart_id='"+cart_id+"'"
    connection.query(query,(err)=>{
      if(!err){
        console.log("Deleted Successfully")
      }
    })
},

edit_profile: function(username,req){
  const query="Update seller_info set first_name='"+req.body.first_name+"',last_name='"+req.body.last_name+"',street='"+req.body.street+"',city='"+req.body.city+"',zip='"+req.body.zip+"' where email=(select email from seller_profile where user_id='"+username+"') "
  const query1="Update seller_phone set seller_contact='"+req.body.contact+"' where seller_id=(select seller_id from seller_profile where user_id='"+username+"')"
  connection.query(query,(err)=>{
    if(!err){
      connection.query(query1)
    }
  })
},
add_to_payment: function(req,total,username){
  const query="insert into payment (amount,payment_type,card_no) values('"+total+"','"+req.body.paymentType+"','"+req.body.card_number+"')"
  connection.query(query,(err)=>{
    if(!err){
      const query1="select * from cart where buyer_id=(select buyer_id from buyer_profile where user_id='"+username+"')"
      connection.query(query1,(err,rows)=>{
        if(!err){
          result=Object.values(JSON.parse(JSON.stringify(rows)))
          result.forEach(function(rows1){
            const query2="insert into past_orders values('"+rows1.buyer_id+"','"+rows1.item_id+"','"+rows1.item_name+"','"+rows1.quantity+"','"+rows1.cost+"')"
          connection.query(query2)
          console.log(rows1,"lets see")
          })
        }
      })
      
    }
  })
},
fetch_orders: function(username,callback){
  const query="select * from past_orders where buyer_id=(select buyer_id from buyer_profile where user_id='"+username+"')"
  connection.query(query,(err,rows)=>{
    if(!err){
      console.log(rows,"orders")
      callback(null,rows)
    }
    else{
      callback(true,null)
    }
  })
}





  }
  
  

