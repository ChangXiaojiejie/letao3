$(function () {

  var id = getStr()[1];
  console.log(id);
  var size;



  //渲染数据
  function render() {

    //发送ajax请求
    $.ajax({
      type: 'get',
      data: {
        id: id
      },
      url: '/product/queryProductDetail',
      dataType: 'json',
      success: function (info) {

        console.log(info);
        $('.lt_main').html(template('pro_tpl', info));

        //手动初始化

        // 获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });

        // 手动初始化数字框
        mui('.mui-numbox').numbox();

        mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });


      }
    });

  }
  render();

  //注册大小的点击事件
  $('.lt_main').on('click','.lt_size span',function () {

    $('.lt_main .lt_size span').removeClass('current');
    $(this).addClass('current');
    
    size = $(this).data('val');
    // console.log(size);
  });

  //加入购物车
  $('#addCart').click(function () {
    
    var obj = {};
    obj.productId = id;
    obj.size = size;
    obj.num = $('.lt_num input').val();
    console.log(obj);

    //发送ajax请求
    $.ajax({
      type:'post',
      data:obj,
      url:'/cart/addCart',
      dataType:'json',
      success:function (info) {
        
        //如果未登录，返回登录页
        if(info.error==400){

          location.href = "login.html?url="+location.href;

          return;
          
        }
        if(info.success){
          mui.confirm('添加成功','小弋提示',['去购物车','继续逛逛'],function (e) {
            
            // console.log(e.index);
            if(e.index==0){
              location.href = "cart.html";
            }
          });
        }
        console.log(info);
      }
    });
    
    
    
  });


});