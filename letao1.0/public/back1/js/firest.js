/**********一级导航分类js设置******* */

$(function () {

  var currentPage = 1;
  var pageSize = 5;

  function rend() {

    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {

        // console.log(info);
        //绑定模板
        var html = template('tml', info)
        // 添加html数据到tbody   
        $('tbody').html(html);

        //分页标签初始化
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本，如果是3，必须指定
          currentPage: currentPage, //指定当前页
          totalPages: Math.ceil(info.total / pageSize), //指定总页数
          onPageClicked: function (a, b, c, page) {
            console.log(page);
            //page指的是点击的页码,修改了当前页
            currentPage = page;
            //重新渲染
            rend();
          }
        });
      }
    });
  }
  rend();



  //注册点击事件
  //实现的思路：
  //1.点击添加按钮，显示模态框
  //2.输入内容，进行表单的非空验证和长度验证

  //3.验证通过，注册添加按钮的点击事件
  $('.addCart').click(function () {

    //显示模态框
    $('#addCat').modal('show');


    //初始化表单验证的实例对象
    $('#form').bootstrapValidator({
      //小图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
      //校验规则
      fields: {
        categoryName: {

          validators: {
            //非空
            notEmpty: {
              message: "请输入一级分类"
            }
          }

        }
      }
    });
  });

  //表单验证通过事件
  $('#form').on("success.form.bv", function (e) {
    //阻止默认提交
    e.preventDefault();

    //使用ajax进行提交
    // console.log('验证通过事件触发');
    var text = $('#form input').val();
    $.ajax({
      url: '/category/addTopCategory',
      data: {
        categoryName: text
      },
      type: 'post',
      success: function (info) {

        if (info.success) {
          //关闭模态框
          $('#addCat').modal('hide');
          //重置一级添加框的表单内容和状态
          $('#form').data("bootstrapValidator").resetForm(true);
          //重新渲染页面
          currentPage = 1;
          rend();
        }
      }
    });
  })

});