/**************设置一级分类的js */
$(function () {
  var currPage = 1;
  var pageSize = 5;
  //封装渲染的函数
  function render() {

    //发送ajax请求
    $.ajax({

      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {

        console.log(info);
        //绑定模板
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);

        //初始化分页插件
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currPage = page;

            //重新渲染数据
            render();

            
          }
        });



      }
    });

  }

  render();

  //点击添加分类，显示模态框
  $('.addBtn').click(function () {

    //显示模态框
    $('#addCate').modal('show');

  });;

  //设置表单验证
  $('#form').bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      //校验用户名，对应input表单的name属性
      categoryName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级分类名称'
          },
        }
      }
    }
  });

  //注册验证完成的事件，阻止浏览器的默认行为，并且发送ajax请求
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({

      url:'/category/addTopCategory',
      data:$('#form').serialize(),
      type:'post',
      dataType:'json',
      success:function (info) {
        
        // console.log(info);
        if(info.success){
          //关闭模态框
          $('#addCate').modal('hide');
          //重新渲染第一页
          currPage = 1;

          render();

          //重置表单内容和表单状态
          $("#form").data('bootstrapValidator').resetForm(true);
        }
        
        
      }

      

    });
});



})