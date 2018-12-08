
$(function () {

  //封装查询渲染函数
  function render() {

    $.ajax({
      url:'/user/queryUserMessage',
      type:'get',
      dataType:'json',
      success:function (info) {

        if(info.error==400){
        

            location.href = "login.html?url="+location.href;
            
    
          return;
          
        }
        
        console.log(info);
        $('.ul_box').html(template('user_tpl',info));
      }
    });
  }
  render();

  //注册退出事件
  $('#logout').on('click',function () {

    // alert('111');
    //发送ajax请求
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
    });
    
    
  });
  
  
  
});