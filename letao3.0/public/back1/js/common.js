/**********进度条加载 */

/**开启进度条 */
$(document).ajaxStart(function () {
  
  NProgress.start();
  
});

/**关闭进度条 */

$(document).ajaxStop(function () {
  
  setTimeout(function () {
    NProgress.done();
    
  },500);
  
});


/**
 * 主页完成的三件事
 * 1.切换二级导航
 * 2.菜单按钮的控制
 * 3.退出功能
 */

 $(function () {
  // 1.切换二级导航
  $('.cartgin').click(function () {
    
    $(this).next().stop().slideToggle();
    
  });

  //2.菜单按钮的控制
  $('.topbar_left').click(function () {
    
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');
    
  });

  $('.topbar_right').click(function () {
    // 显示模态框
    $('#myModal').modal('show');
    $('#logoutBtn').click(function () {
      
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
  });
  


  

   
 });