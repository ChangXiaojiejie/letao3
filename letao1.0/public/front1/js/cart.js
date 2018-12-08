
$(function () {

  //封装渲染函数
  function render() {
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/cart/queryCart',
      success:function (info) {
        
        // console.log(info);
        //登录检测
        if(info.error==400){
          mui.confirm('请先登录再访问','文星提醒',['去登陆','取消'],function (e) {
            location.href = "login.html?url="+location.href;
            
          });
          return;
          
        }
        // console.log(info);
        $('.lt_main ul').html(template('cat_tpl',{list: info}));
      }
    });
    
    
  }
  render();
  
  
});


