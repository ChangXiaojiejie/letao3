
$(function () {
  
  //声明变量
  
  // 封装查询一级列表的函数
  function render() {
    
    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/category/queryTopCategory',
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        //绑定模板动态渲染
        var htmlStr = template('firTpl',info);
        $('.lt_category_left ul').html(htmlStr);

        //获取初始状态下的二级分类
        getSend(info.rows[0].id);
        
        
      }
    });
    
  }

  render();

  //封装获取二级分类的函数
  function getSend(id) {
    
    //发送ajax请求
    $.ajax({
      type:'get',
      data:{
        id:id
      },
      url:'/category/querySecondCategory',
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        var htmlStr = template('senTpl',info);
        $('.lt_category_right ul').html(htmlStr);
      }
    });
    
  }

  //注册点击事件，获取当前点击a的自定义属性id，根据id去获取二级分类的信息
  $('.lt_category_left').on('click','a',function () {
    //切换状态
    $('.lt_category_left a').removeClass('active');
    $(this).addClass('active');

    //获取当前a的id
    var id = $(this).data('id');

    // console.log(id);
    getSend(id);
    
    
  });



  
})
