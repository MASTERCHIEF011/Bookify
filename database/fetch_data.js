const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'masterchief011',
    database: 'db'
  })


  module.exports={
    fetch_user :function(user,callback){
        const query="select * from signup_info where user_name = '"+user+"'"
         connection.query(query,(err,rows)=>{
             if(!err){
            callback(null,rows)
          }
            else
            callback(true,null)
        })
    },
    fetch_id :function(user_id,callback){
      const query="select * from signup_info where id = '"+user_id+"'"
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

  }
  }
