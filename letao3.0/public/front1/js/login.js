$(function () {

  var url = location.search;

  var str = url.substr(1);

  var index = str.indexOf('=');
  
  str = str.substr(index+1);

  console.log(str);

  //处理登录事件
  $('#loginBtn').click(function () {
    
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();

    if(username.length==0||password.length==0){
      alert('用户名或密码不能为空');
      return;
    }
    //发送ajax请求

    $.ajax({
      type:'post',
      data:{
        username:username,
        password:password
      },
      dataType:'json',
      url:'/user/login',
      success:function (info) {
        // console.log(info);
        
        if(info.success){
          // alert('登陆成功');
          if(str.length!=0){
            location.href = str;
            return;
          }
          location.href = "user.html";
        }else if(info.error==403){
          alert(info.message);
        }
        
        
      }
    });
    
  });
  
  
  
});