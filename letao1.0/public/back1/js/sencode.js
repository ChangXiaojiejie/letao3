/****设置二级列表 */

$(function () {
  var currentPage=1 ;
  var pageSize =5;

  //初始化渲染表单
  function rend() {
   
    //发送ajax请求
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success: function (info) {
        // console.log(currentPage);
        // console.log(info);
        var html = template('tml', info);
        $('tbody').html(html);


        //初始化分页

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
  //1.点击按钮显示模态框
  //2.发送ajax请求获取一级分类的数据
  //3.准备模板引擎，将获取到的一级分类的信息渲染在ul部分并隐藏该区域
  //4.点击选择图片，获取图片，发送ajax请求到后台，根据后台返回的结果，设置图片的src和隐藏域的value值
  //5.给所有的表单元素设置表单验证
  //6.验证通过后，阻止浏览器的默认行为，发送jajx请求
  //5.点击添加，将所有信息提交

  //1.点击按钮显示模态框
  //2.发送ajax请求获取一级分类的数据
  $('.addBtn').click(function () {
    //显示模态框
    $('#cartModal').modal('show');
    // alert('触发');

    //发送ajax请求，获取一级菜单的内容
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      data:{
        page: 1,
        pageSize:100
      },
      type:'get',
      success:function (info) {
        
        // console.log(info);
        var html = template('firest_tml',info);
        $('.dropdown-menu').html(html);
        
      }
    });
    
  });


  //3.准备模板引擎，将获取到的一级分类的信息渲染在ul部分并隐藏该区域
  //注册点击选中事件，将选中的a标签的text文本赋值给button，并将值赋给隐藏域categoryId
  $('.dropdown-menu').on('click','a',function () {
    
    var text = $(this).text();
    var categoryId = $(this).data('id');
    // console.log(categoryId);

    //给button设置文本内容
    $('#dropdownText').text(text);

    $('[name="categoryId"]').val(categoryId);

    //改变一级标题输入框的状态
    $("#form").data("bootstrapValidator").updateStatus("categoryId", "VALID" );


    // alert(text,categoryId);

    // alert('触发');
    
  });

  // 4.点击选择图片，获取图片，发送ajax请求到后台，根据后台返回的结果，设置图片的src和隐藏域的value值
  $("#fileupload").fileupload({
    dataType:"json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址 
    //再将图片的地址赋值给隐藏域
    done:function (e, data) {
      var imgUrl = data.result.picAddr;
      $('#imgBox img').attr('src',imgUrl);

      //再将图片的地址赋值给隐藏域
      $('[name="brandLogo"]').val(imgUrl);

      //改变当前的input框的状态
      $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID" );
    }
  });

  //5.给所有的表单元素设置表单验证
  $('#form').bootstrapValidator({

    /**设置过滤的不验证的表单类型 */
    //都要验证
    excluded: [''],

    feedbackIcons: {
      //设置验证通过的
      valid: 'glyphicon glyphicon-ok',
      //验证失败的
      invalid: 'glyphicon glyphicon-remove',
      //正在验证的
      validating: 'glyphicon glyphicon-refresh'
    },

    fields:{
      //验证一级分类id
      categoryId:{
        validators:{
          notEmpty:{
            message: "请选择一级分类"
          }
        }
      },
      //验证二级标题内容
      brandName:{
        validators:{
          notEmpty:{
            message: "请输入二级分类名称"
          }
        }
      },
      //验证上传的图片
      brandLogo:{
        validators:{
          notEmpty:{
            message: "请选择图片"
          }
        }
      }

    }

  });

  //6.验证通过后，阻止浏览器的默认行为，发送jajx请求
  //7.点击添加，将所有信息提交
  $("#form").on('success.form.bv',function (e) {

    //阻止浏览器的默认跳转
    e.preventDefault();

    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$('#form').serialize(),
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        if(info.success){
          //关闭模态框
          $('#cartModal').modal('hide');

          //渲染页面
          currentPage=1;
          rend();

          //清空输入框的内容和状态
    
          $('#form').data('bootstrapValidator').resetForm(true);

          //重置一级分类按钮
          $('#dropdownText').text('请选择一级分类');

          //重置图片的src
          $('#imgBox img').attr('src','images/none.jpg');
 
        }

      }
      
    });
     
   });

  /*
   * 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态*/














});