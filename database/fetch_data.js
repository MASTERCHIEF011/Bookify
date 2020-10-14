const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'masterchief011',
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
    const query="select * from books"
    connection.query(query,(err,rows)=>{
      if (!err) {
        callback(null,rows)
      }
      else
      callback(true,null)
    })

  },
  fetch_all_magazines :function(callback){
    const query="select * from magazines"
    connection.query(query,(err,rows)=>{
      if (!err) {
        callback(null,rows)
      }
      else
      callback(true,null)
    })

  },
  fetch_all_stamps :function(callback){
    const query="select * from stamps"
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
  add_to_inventory :function(){
    const query="insert into book_detail_info values()"
  },
  get_sell_form_data :function(req,username){
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
      // console.log(data,"rinkiya")
      //
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
          release_date : req.body.release_date
      }
      const query1="insert into magazine_details values('"+data.item_id+"','"+data.genre+"','"+data.edition+"','"+data.release_date+"')"
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
}






  }
  
  

