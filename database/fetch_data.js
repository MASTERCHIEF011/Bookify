const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'masterchief011',
    database: 'db'
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
  add_to_wishlist :function(username,item_name,callback){
    const query="select buyer_id from buyer_profile where user_id='"+username+"'"
    const query1="select item_id from inventory where item_name='"+item_name+"'"
    connection.query(query,(err,rows)=>{
      if (!err) {
        connection.query(query1,(err,rows1)=>{
          if(!err){
            const query2="insert into wishlist values('"+rows[0].buyer_id+"','"+rows1[0].item_id+"','"+item_name+"')"
            connection.query(query2,(err)=>{
              if(!err){
                const query3="select buyer_id,item_id,item_name from wishlist where buyer_id=(Select buyer_id from buyer_profile where user_id='"+username+"')"
                connection.query(query3,(err,result)=>{
                  if(!err){
                    callback(null,result)
                  }
                })
                
              }
            })
          }
        })
      }
    })

    console.log(item_name)
    //const query="select "
  }
  }
