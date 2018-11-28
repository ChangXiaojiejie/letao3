/***
 * 
 * 发送ajax请求给后台判断当前的用户是否登录
 * 
 */

 $.ajax({
   url:'/employee/checkRootLogin',
   dataType:'json',
   type:'get',
   success:function (info) {
     
    // console.log(info);
    if(info.error===400){
      location.href = "login.html"
    }
    if(info.success){
      console.log("当前用户已登录");
      
    }
    
     
   }
 });