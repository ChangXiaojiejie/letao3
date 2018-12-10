
$(function () {
  var id ;
  //1.封装渲染侧边栏分类的数据的方法
  function render() {

    //发送ajax请求
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/category/queryTopCategory',
      success:function (info) {
        
        console.log(info);
        $('.lt_aside ul').html(template('aside_tpl',info));

        id =  info.rows[0].id;

        //调用查询商品信息
        getProduct();
      }
    });
  }

  render();

  //2.渲染商品列表
  function getProduct() {
    
    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id,
      },
      dataType:'json',
      success:function (info) {
        
        // console.log(info);
        $('.lt_nav_product ul').html(template('pro_tpl',info));
      }
    });
    
  }

  //给侧边栏导航注册点击事件
  $('.lt_aside').on('click','a',function () {

    //切换类名
    $('.lt_aside a').removeClass('active');

    $(this).addClass('active');


    id = $(this).data('id');

    //调用查询商品信息函数
    getProduct();
    
    // console.log(id);
    
    
  });

  
  
});