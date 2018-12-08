$(function () {
 
  //获取当前地址栏中的参数
  var str = location.search;
  //去掉问号
  str = str.substr(1);

  var index = str.indexOf('=');
  str = str.substr(index + 1);
  console.log(str);

  //获取用户名和密码

  $('#loginBtn').click(function (e) {
    //阻止默认跳转
    e.preventDefault();

    
    var username = $('#username').val();
    var password = $('#password').val();

    // console.log(username,password);


    var check = true;
    mui(".mui-input-group input").each(function () {
      //若当前input为空，则alert提醒 
      if (!this.value || this.value.trim() == "") {
        var label = this.previousElementSibling;
        mui.toast(label.innerText + "不允许为空")
        check = false;
        return false;
      }

    });
    //校验通过，继续执行业务逻辑 
    if (check) {
      console.log('触发');
      
      $.ajax({
        type: 'post',
        url: '/user/login',
        data: {
          username: username,
          password: password
        },
        dataType: 'json',
        success: function (info) {
          console.log(info);
          if (info.success) {
            if (str) {
              // alert('可以跳了');
              location.href = str;
              return;
            }
            location.href = 'user.html';
          }
        }
      });
    }

  });












});