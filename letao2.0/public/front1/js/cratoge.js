$(function() {
  // 点击切换状态
  // 给所有的a标签注册点击事件
  $(".lt_cartoge_left ").on("click", "a", function() {
    //获取当前a标签上的自定义属性data-id
    var id = $(this).data("id");
    getSend(id);

    //删除所有a的active类
    $(".lt_cartoge_left a").removeClass("active");

    // 给当前的a添加active
    $(this).addClass("active");
  });

  //封装获取一级分类函数
  function getFir() {
    //发送ajax
    $.ajax({
      type: "get",
      dataType: "json",
      url: "/category/queryTopCategory",
      success: function(info) {
        // console.log(info);
        //绑定模板
        var htmlStr = template("firTpl", info);
        $(".lt_cartoge_left ul").html(htmlStr);

        //渲染二级菜单
        var id = info.rows[0].id;
        getSend(id);
      }
    });
  }

  getFir();

  //获取二级分类函数
  function getSend(id) {
    //发送ajax请求
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function(info) {
        // console.log(info);
        var htmlStr = template("senTpl", info);
        $(".lt_cartoge_right ul").html(htmlStr);
      }
    });
  }
});
