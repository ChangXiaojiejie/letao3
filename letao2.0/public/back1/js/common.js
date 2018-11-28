  //进度条


//开启进度条
$(document).ajaxStart(function () {
    
  NProgress.start();
});

//关闭进度条
$(document).ajaxStop(function () {
  
  setTimeout(function () {
    NProgress.done();
    
  },500);
  
});

/****
 * 
 */

 $(function () {
  // 公共的功能:
  // 1. 左侧二级菜单切换
  $('.category').click(function () {
    $(this).next().stop().slideToggle();  
  });
    // 2. 左侧侧边栏切换
    $('.topbar_left').click(function () {
      $('.lt_aside').toggleClass('hiedmenu');
      $('.lt_topbar').toggleClass('hiedmenu');
      $('.lt_main').toggleClass('hiedmenu');
      
    });


    // 3. 退出功能
      // (1) 点击右侧按钮, 显示模态框
    $('.topbar_right').click(function () {
      
      //显示模态框
      $('#logout').modal("show")
      // (2) 点击退出模态框的退出按钮, 完成退出功能

      $('#loginOut').click(function () {
        
        //发送ajax请求
        $.ajax({
          type:'get',
          url:'/employee/employeeLogout',
          dataType:'json',
          success:function (info) {
            
            // console.log(info);
            if(info.success){
              location.href = "login.html";
            }
          }
        });
        
      });


      // 发送ajax请求, 让后台销毁当前用户的登录状态


      
    });
     
   
 });

   