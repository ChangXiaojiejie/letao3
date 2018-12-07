 /** 
  * 4.开启进度条
  */

 //如果有ajax请求，开始
 $(document).ajaxStart(function () {
   NProgress.start();
 });

 $(document).ajaxStop(function () {
   setTimeout(function () {
     NProgress.done();
   }, 500);
 });

 $(function () {
       // 公共的功能:
       // 1. 左侧二级菜单切换
       $('.category').click(function () {

         $(this).next().stop().slideToggle();

       });


       // 2. 左侧侧边栏切换
       //实现的思路，在css样式中设置好样式，然后注册点击事件，点击之后切换类名
       $(".menus").click(function () {

         $('.lt_aside').toggleClass('hidemenu');
         $('.lt_topbar').toggleClass('hidemenu');
         $('.lt_main').toggleClass('hidemenu');
       });

       // 3. 退出功能
       // (1) 点击右侧按钮, 显示模态框

       $('.logoutBtn').click(function () {

         //显示模态框
         $('#logout').modal('show')
         // (2) 点击退出模态框的退出按钮, 完成退出功能
         $('#logoutBtn').click(function () {

          //  console.log('退出了');
           // 发送ajax请求, 让后台销毁当前用户的登录状态

           $.ajax({
             type: "get",
             url: "/employee/employeeLogout",
             dataType: "json",
             success: function (info) {
              //  console.log(info);
                if(info.success){
                  location.href = "login.html";
                }
               }
             
           })

         });
        });
      });