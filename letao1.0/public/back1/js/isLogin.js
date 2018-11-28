/**
 * 实现登录检测
 * 每次请求页面都要发送一次ajax请求，判断当前用户是否登陆
 */

$.ajax({
  type: 'get',
  dataType:'json',
  url:'/employee/checkRootLogin',
  success:function (info) {
    
    // console.log(info);
    if(info.error===400){
      location.href = "login.html";
    }
    if(info.success){
      console.log('当前用户已登录');
      
    }
  }
});

