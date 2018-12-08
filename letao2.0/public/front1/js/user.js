$(function () {

  //渲染数据
  function render() {
    
    //发送ajax请求
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/user/queryUserMessage',
      success:function(info){
        console.log(info);
        if(info.error == 400){
          location.href = "login.html";
          return;
        }

        $('.ul_box').html(template('user_tpl',info));
        
      }
    });
    

  }
  render();

  //退出
  $('#logout').click(function () {
    
    //发送ajax请求
    $.ajax({
      url:'/user/logout',
      type:'get',
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