$(function () {

  function render() {
    
    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/user/queryUserMessage',
      dataType:'json',
      success:function (info) {
        
        // console.log(info);
        $('.lt_main ul').html(template('user_tpl',info))
        
        
      }
    });
    
  }

  render();

  //注册退出事件
  $('#logout').click(function () {
    //ajax
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/user/logout',
      success:function (info) {
        
        // console.log(info);
        if(info.success){
          location.href = "login.html";
        }
        
        
      }
    })
    
    
  });
  
  
});