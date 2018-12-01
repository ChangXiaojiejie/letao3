/*********设置二级分类的 */
$(function () {

  var currPage = 1;
  var pageSize = 5;

  //渲染二级分类列表
  function render() {

    //发送ajax请求
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      data: {
        page: currPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {

        // console.log(info);
        //绑定模板引擎
        var htmlStr = template('senTpl', info);

        $('tbody').html(htmlStr);

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

  //点击添加分类弹出模态框
  $('.addBtn').click(function () {

    //显示模态框
    $('#addCart').modal('show');

    //发送ajax请求获取一级分类信息
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 1000
      },
      dataType: 'json',
      success: function (info) {

        // console.log(info);
        //绑定模板，动态渲染
        var htmlStr = template('firTpl', info);
        $('.dropdown-menu').html(htmlStr);
      }
    });

  });

  //给所有的a注册事件
  $('.dropdown-menu').on('click', 'a', function () {

    //获取到当前的a的text值
    var txt = $(this).text();

    //获取当前的a的id
    var id = $(this).data('id');
    // 设置按钮文本
    $('#spanText').text(txt);

    //设置隐藏域
    $('[name="categoryId"]').val(id);
    // alert('触发');

    //修改表单的状态
    $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

  });

  //添加表单验证
  $('#form').bootstrapValidator({
    //显示隐藏域的内容
    excluded: [''],


    //设置校验状态
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 设置校验字段
    fields: {
      //校验用户名，对应input表单的name属性

      // 请选择一级分类
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级列表'
          },
        }
      },
      // 请选择二级分类
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级列表'
          },
        }
      },
      // 请选择图片
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入一级列表'
          },
        }
      }
    }
  });

  //文件上传初始化
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      console.log(data.result);
      //将图片地址取出来
      var imgUrl = data.result.picAddr;

      //赋值给img的src
      $('#imgBox img').attr('src', imgUrl);

      // 改变图片隐藏域的状态
      $('[name="brandLogo"]').val(imgUrl);
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
    }

  });

  //阻止浏览器的默认提交，由ajax提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
      url:'/category/addSecondCategory',
      type:'post',
      dataType:'',
      data:$('#form').serialize(),
      success:function (info) {
        
        //关闭模态框
        $('#addCart').modal('hide');

        //渲染第一页
        currPage = 1;
        render();
        //重置表单项内容和状态
        $('#form').data('bootstrapValidator').resetForm(true);

        //手动重置按钮和图片

        $('#spanText').text('请选择一级分类名');

        $('#imgBox img').attr('src','./images/01.jpg');
      }
    });
});





});