/********设置用户管理的 */

$(function() {
  var currPage = 1;
  var pageSize = 5;

  var id;
  var isDelete;

  //封装获取数数据方法，发送ajax请求
  function render() {
    $.ajax({
      type: "get",
      data: {
        page: currPage,
        pageSize: pageSize
      },
      url: "/user/queryUser",
      dataType: "json",
      success: function(info) {
        //绑定模板
        var htmlStr = template("tmp", info);
        $("tbody").html(htmlStr);
        // console.log(info);
        //初始化分页标签
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total/info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function(event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currPage = page,
            render();
          }
        });
      }
    });
  }
  render();

  //给a标签注册事件，点击按钮弹出模态框
  $("tbody").on("click", ".btn", function() {
    // alert('触发');
    //显示模态框
    $("#Updata").modal("show");
    id = $(this)
      .parent()
      .data("id");
    isDelete = $(this).hasClass("btn-danger") ? "0" : "1";
  });

  //点击确定按钮 获取当前的id 和当前按钮的类名
  $("#yes").click(function() {
    // console.log(id);
    // console.log(isDelete);
    //发送ajax请求
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: id,
        isDelete: isDelete
      },
      dataType: "json",
      success: function(info) {
        // console.log(info);
        if (info.success) {
          //关闭模态框
          $("#Updata").modal("hide");

          //渲染数据

          render();

          //
        }
      }
    });
  });
});
