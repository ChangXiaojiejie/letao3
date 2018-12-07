/******发送ajax请求获取数据，渲染页面 */
$(function () {
  var currPage = 1;
  var pageSize = 5;
  var id;
  var isDelete;

  //1.封装发送ajax请求，渲染页面
  function render() {

    $.ajax({

      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currPage,
        pageSize: pageSize
      },
      success: function (info) {

        // console.log(info);
        //模板绑定
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr)

        //分页初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currPage = page;
            //重新渲染当前页
            render();
          }
        });

      }

    });

  }
  //首次调用获取第一页数据
  render();





  //给btn标签注册事件 获取按钮父元素身上的自定义属性，获取到id，再根据当前的按钮的类名，判断要修改的状态
  $('tbody').on('click', '.btn', function () {

    // 显示模态框
    $('#disable').modal('show');

    //获取当前的元素的id
    id = $(this).parent().data('id');

    // 根据当前的按钮的类名，判断要修改的状态
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // alert(isDelete);
    // alert(id);

  })

  //给模态框添加按钮注册点击事件，发送ajax请求
  $('#yes').click(function () {

    //发送ajax请求
    $.ajax({
      type: 'post',
      url: '/user/updateUser',
      data: {
        id: id,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {

        // console.log(info);
        if (info.success) {
          //关闭模态框
          $('#disable').modal('hide');

          //渲染页面
          render();

          //清空输入框的内容和状态
          // $("#form").data('bootstrapValidator').resetForm(true);
        }

      }
    });
  })




})