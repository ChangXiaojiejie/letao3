/***********设置二级菜单的样式***** */
$(function () {
  var currPage = 1;
  var pageSize = 5;

  //封装渲染函数
  function render() {

    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        //绑定模板引擎
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);

        //初始化分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currPage = page;

            render();
          }
        });

      }
    });
  }
  render();

  //点击添加分类按钮，弹出模态框
  $('.addBtn').click(function () {

    //显示模态框
    $('#addCate').modal('show');

    //发送ajax请求，获取一级菜单的内容
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 100,
      },
      dataType: 'json',
      success: function (info) {

        console.log(info);
        //绑定模板
        var htmlStr = template('fister_tmp', info);
        $('.dropdown-menu').html(htmlStr);
      }
    });
  });

  //设置 点击一级菜单，替换button的内容，同时设置隐藏域的内容
  $('.dropdown-menu').on('click', 'a', function () {
    // alert('fsdgfhsj');
    var txt = $(this).text();
    var id = $(this).data('id');

    //设置按钮文本
    $('#firTxt').text(txt);

    // 设置隐藏域input的val值
    // console.log($('[name="categoryId"]'));

    $('[name="categoryId"]').val(id);

    //修改一级分类的当前状态
    $("#form").data('bootstrapValidator').updateStatus('categoryId', "VALID")
  });

  //设置图片上传的初始化

  // 4. 配置文件上传插件, 让插件发送异步文件上传请求
  $('#fileupload').fileupload({
    dataType: "json",
    // done 表示文件上传完成的回调函数
    done: function (e, data) {
      console.log(data);
      //console.log( data.result ); // 后台返回的对象
      var imgUrl = data.result.picAddr;
      console.log(imgUrl);

      //将图片地址赋值给img的src和隐藏域的val
      $('#imgBox').attr('src', imgUrl);

      //将图片地址赋值给隐藏域
      $('[name="brandLogo"]').val(imgUrl);

      //修改图片的当前状态
      $("#form").data('bootstrapValidator').updateStatus('brandLogo', "VALID")
    }
  });

  //5.设置表单验证

  $('#form').bootstrapValidator({
    //过滤，选择不过滤
    excluded: [''],

    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    fields: {
      //校验用户名，对应input表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入二级分类'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择图片'
          }
        }
      },
    }
  });


  //6.阻止浏览器的默认行为，发送ajax请求
  $('#form').on('success.form.bv',function (e) {
    console.log('提交了');
    
    //阻止浏览器的默认行为，发送ajax请求
    e.preventDefault();

    //发送ajax请求
    $.ajax({
      type:'post',
      data:$('#form').serialize(),
      url:'/category/addSecondCategory',
      dataType:'json',
      success:function (info) {

        if(info.success){
          //关闭模态框
          $('#addCate').modal('hide');

          //刷新第一页页面
          currPage=1;
          render();

          //重置表单内容和状态
          $("#form").data('bootstrapValidator').resetForm(true);

          //重置图片
          $('#imgBox').attr('src', './images/none.png');


          // 重置一级分类按钮
          $('#firTxt').text('请选择一级分类');

        }
        // console.log(info);
      }
    });

  })

})