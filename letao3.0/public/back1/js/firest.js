/********一级分类的js样式 */
$(function () {

  var currPage = 1;
  var pageSize = 5;

  //封装渲染数据的方法
  function render() {

    //发送ajx请求
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: currPage,
        pageSize: pageSize,
      },
      dataType: 'json',
      success: function (info) {

        // console.log(info);
        // 绑定模板
        var htmlStr = template('firTel', info);
        $('tbody').html(htmlStr);

        //分页初始化
        //初始化分页标签
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currPage = page,
              render();
          }
        });
      }
    });
  }

  render();

  //点击添加分类，弹出模态框
  $('.addBtn').click(function () {
    //显示模态框
    $('#addCart').modal('show');
  });

  //表单验证
  $('#form').bootstrapValidator({
    //设置校验状态
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 设置校验字段
    fields: {
      //校验用户名，对应input表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级列表'
          },
        }
      },
    }
  });

  //阻止浏览器的默认提交表单，youajax提交点击添加按钮，发送ajax请求
  $('#form').on('success.form.bv',function (e) {
    
    //阻止默认提交
    e.preventDefault();

    //发送ajax请求
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:$('#form').serialize(),
      dataType:'json',
      success:function (info) {
        
        // console.log(info);
        if(info.success){
          //关闭模态框
          $('#addCart').modal('hide');

          //渲染第一页面
          currPage = 1;
          render();

          //重置表单内容和状态
          $("#form").data('bootstrapValidator').resetForm(true);
        }
      }

    });
    
  })  

  

    
  




});