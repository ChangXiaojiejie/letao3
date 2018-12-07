
//发送ajax请求，判断当前用户是否登陆

$.ajax({
  type:'get',
  dataType:'json',
  url:'/user/queryUserMessage',
  success:function (info) {
    
    if(info.error==400){
      location.href = "login.html";
    }
    console.log(info);
    
  }
});