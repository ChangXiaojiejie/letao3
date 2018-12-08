$(function () {
//  var url = getSearStr(url)[1];

if(location.search){
  //获取字符串
  var str = location.search;
  console.log(str);
  //去掉问号
  str = str.substr(1);
  console.log(str);
  //找到第一个等号位置
  var index = str.indexOf('=');
  //截取第一个等号后面的内容
  var str = str.substr(index+1);
  console.log(str);

}
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
            if(str){
              location.href = str;
            }
            else{
              history.back();
            }
          }


        }

      });



    }
  });


});