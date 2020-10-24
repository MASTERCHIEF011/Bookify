DELIMITER //
create procedure conv2()
Begin
declare sn2 int; 
declare seller_id1 varchar(20); 
set sn2=(select Max(sn) from seller_profile); 
set sn2=sn2+1; 
set seller_id1='S'; 
set seller_id1=concat(seller_id1,sn2); 
insert into seller_profile(seller_id,email,trust_factor,user_id) values(seller_id1,'"+req.body.email+"',1.00,'"+req.body.username+"'); 
insert into seller_info values('"+req.body.email+"','"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.address+"','"+req.body.city+"','"+req.body.zip+"'); 
insert into seller_phone values(seller_id1,'"+req.body.contact+"'); 
END 
//
DELIMITER ; 
call conv2();