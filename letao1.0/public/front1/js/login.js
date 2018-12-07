$(function () {

  $('.logBtn').click(function () {
    var check = true;
    mui("#form input").each(function () {
      //若当前input为空，则alert提醒 
      if (!this.value || this.value.trim() == "") {
        var label = this.previousElementSibling;
        mui.toast(label.innerText + '不能为空');
        check = false;
        return false;
      }
    }); //校验通过，继续执行业务逻辑 
    if (check) {
      // mui.alert('验证通过!')

      //发送ajax请求
      $.ajax({
        url: '/user/login',
        type: 'post',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function (info) {

          // console.log(info);
          if(info.success){
            history.back();
          }


        }

      });



    }



  });












});