$(function () {

  var size;

  //获取地址栏中的数据
  var id = getSearch('productId');

  //发送ajax请求获取数据
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

        // 手动初始化轮播图
        // 获得slider插件对象
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
        });

        // 手动初始化数字框
        mui('.mui-numbox').numbox();

        mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
          indicators: false, //是否显示滚动条
        });


      }
    });


  }

  render();

  //注册点击事件
  $('.lt_main').on('click', '.lt_size span', function () {

    //切换高亮效果
    $('.lt_main .lt_size span').removeClass('current');

    $(this).addClass('current');



    size = $(this).data('val');
    // alert(val);
  });

  //加入购物车
  $('#addCart').click(function () {

    var num = $('.lt_num input').val();
    var obj = {};
    obj.num = num;
    obj.size = size;
    obj.productId = id;

    $.ajax({
      type: 'post',
      data: obj,
      dataType: 'json',
      url: '/cart/addCart',
      success: function (info) {

        console.log(info);
        if (info.error == 400) {
          location.href = "login.html?url=" + location.href;
          return;
        }

        mui.confirm('添加成功', '文星提示', ['去购物车', '继续逛逛'], function (e) {

          if (e.index == 0) {
            //跳转到购物车
            location.href = "cart.html";

          }
        });
      }
    });
  });
});