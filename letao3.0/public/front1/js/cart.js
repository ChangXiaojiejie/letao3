$(function () {

  //获取数据，发送ajax请求
  function render() {

    //发送ajax请求
    $.ajax({
      type:'get',
      data:'',
      dataType:'json',
      url:'/cart/queryCart',
      success:function (info) {
        
        console.log(info);
        if(info.error){
          location.href = "login.html?url="+location.href;
        }

        $('.lt_main ul').html(template('pro_tpl',{list:info}))

        
        
      }
    });
    
    
  }

  render();
  
  
});