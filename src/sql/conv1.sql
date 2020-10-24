DELIMITER //
create procedure conv1()
Begin 
declare sn1 int; 
declare buyer_id1 varchar(20); 
set sn1=(select Max(sn) from buyer_profile); 
set sn1=sn1+1; 
set buyer_id1='B'; 
set buyer_id1=concat(buyer_id1,sn1); 
insert into buyer_profile(buyer_id,email,user_id) values(buyer_id1,'"+req.body.email+"','"+req.body.username+"'); 
insert into buyer_info values('"+req.body.email+"','"+req.body.first_name+"','"+req.body.last_name+"','"+req.body.address+"','"+req.body.city+"','"+req.body.zip+"'); 
insert into buyer_phone values(buyer_id1,'"+req.body.contact+"'); 
END 
// 
DELIMITER ; 
call conv1();