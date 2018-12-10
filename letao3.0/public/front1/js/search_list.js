
$(function () {

  //获搜索页面传过来的值
  var key = getSearch('key');
  console.log(key);
  // 将值赋给输入框
  $('.search_input').val(key);

  //1.封装查询商品信息的函数
  function render() {
    var obj = {};
    obj.proName = $('.search_input').val();
    obj.page = 1;
    obj.pageSize = 100;
    //发送ajax请求
    $.ajax({
      type:'get',
      data:obj,
      dataType:'json',
      url:'/product/queryProduct',
      success:function (info) {
        
        console.log(info);
        console.log(template('pro_tpl',info));
        
        $('.lt_product ul').html(template('pro_tpl',info));
        
      }
    });
    
    
  }

  render();

  //注册点击搜索事件
  $('.search_btn').click(function () {
    
    var val = $('.search_input').val().trim();
    
    if(val.length==0){
      mui.toast('搜索内容不能为空');
      return;
    }

    render();
  });
  
  
  
});