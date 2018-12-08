$(function () {

  var productId = getSearch("productId");

  console.log(productId);

  var val;


  //发送ajax请求 根据productId 去获取对应的详细信息
  function render() {

    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetail',
      data: {
        id: productId
      },
      dataType: 'json',
      success: function (info) {

        console.log(info);
        $('.lt_main').html(template('pro_tpl', info));

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

  $('.lt_main').on('click', '.lt_size.item_box span', function () {

    val = $(this).data('val');

    // alert(val);
    $('.lt_main .lt_size.item_box span').removeClass('current');
    $(this).addClass('current');

  });

  $("#addCart").click(function () {

    var num = $('[type="number"]').val();

    //发送ajax请求
    $.ajax({
      type: 'POST',
      url: '/cart/addCart',
      data: {
        productId: productId,
        num: num,
        size: val
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        if (info.error == 400) {
          location.href = "login.html?url="+location.href;
          return;
        }

        //弹出消息框
        mui.confirm('添加成功', '文星提示', ['去购物车', '继续逛逛'], function (e) {

          console.log(e.index);
          if (e.index == 0) {
            location.href = "cart.html";
          }

        })
      }
    });


  });



});