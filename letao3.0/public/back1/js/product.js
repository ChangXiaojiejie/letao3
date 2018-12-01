/*****************商品管理的样式 */
$(function () {

  var currPage = 1;
  var pageSize = 5;
  var picArr=[];

  // 获取渲染商品的数据
  function render() {

    //发送ajax请求
    $.ajax({
      type: 'get',
      data: {
        page: currPage,
        pageSize: pageSize
      },
      url: '/product/queryProductDetailList',
      dataType: 'json',
      success: function (info) {

        // console.log(info);
        // 绑定模板
        var htmlStr = template('proTpl', info);
        $('tbody').html(htmlStr);

        //分页初始化
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

  //点击添加商品，弹出模态框
  $('.addBtn').click(function () {

    //显示模态框
    $('#addPro').modal('show');

    //发送ajax请求，渲染二级分类
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 10000
      },
      type: 'get',
      dataType: 'json',
      success: function (info) {

        // console.log(info);
        //绑定模板
        var htmlStr = template('senTpl', info);
        $('.dropdown-menu').html(htmlStr);


      }
    });

  });

  //设置a标签点击事件 
  //1.替换按钮的文本
  //2.将二级分类id赋值给隐藏域
  //3.改变二级分类输入框的状态
  $('.dropdown-menu').on('click', 'a', function () {

    var txt = $(this).text();
    var id = $(this).data('id');

    // 替换按钮的文本
    $('#spanText').text(txt);

    // 将二级分类id赋值给隐藏域
    $('[name="brandId"]').val(id);

    //改变二级分类输入框的状态

    $('#form').data('bootstrapValidator').updateStatus("brandId", "VALID");

  });

  //设置表单验证
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [''],

    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    //3. 指定校验字段
    fields: {
      //校验用户名，对应input表单的name属性

      // 请选择二级分类
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请选择二级分类'
          },
        }
      },

      // 请输入商品名称
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品名称'
          },
        }
      },

      // 请输入商品描述
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品描述'
          },
        }
      },

      // 请输入商品库存
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存格式，非0开头的数字'
          }
        }
      },

      // 请输入商品尺寸
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品尺寸'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '库存格式，尺寸格式xx-xx，例如32-45'
          }
        }
      },

      // 请输入商品原价
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品原价'
          },
        }
      },

      // 请输入商品现价
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请输入商品现价'
          },
        }
      },

      // 请上传3张图片
      imgStatu: {
        validators: {
          //不能为空
          notEmpty: {
            message: '请上传3张图片'
          },
        }
      },

    }

  });

  //处理多张图片上传
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {
      // console.log(data.result);
      //将上传的对象添加到数组中
      // 为什么使用unshift而不使用push，
      //答：因为每次添加的图片要放到最前面
      picArr.unshift(data.result);

      //显示添加的图片
      $('#imgBox').prepend('<img src="'+data.result.picAddr+'" alt="" style="width:100px;height: 100px">');

      //数量超过三张，删除最后面的图片，同时删除页面上最后一张
      if(picArr.length>3){
        picArr.pop();
        $('#imgBox img:last-of-type').remove();
      }

      //若果上传的图片等于三张，改变图片的表单状态
      if(picArr.length==3){
        $('#form').data('bootstrapValidator').updateStatus("imgStatu", "VALID");
      }
      if(picArr.length<3){
        $('#form').data('bootstrapValidator').updateStatus("imgStatu", "INVALID");
      }

    }
  });

  //，表单验证通过，阻止表单的默认提交，发送ajax请求
  $('#form').on('success.form.bv',function (e) {
    //阻止浏览器的默认行为
    e.preventDefault();

    //准备发送的数据
    var data = $('#form').serialize();
    // console.log(data);
    data += "&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
    data += "&picName2="+picArr[1].picName+"&picAddr2="+picArr[1].picAddr;
    data += "&picName3="+picArr[2].picName+"&picAddr3="+picArr[2].picAddr;

    //发送ajax
    $.ajax({
      type:'post',
      data:data,
      dataType:'json',
      url:'/product/addProduct',
      success:function (info) {
        console.log(info);
        if(info.success){
          //关闭模态框
          $('#addPro').modal('hide')
          //刷新第一页面
          currPage = 1;
          render();

          //重置表单内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);

          //手动重置按钮文本和图片
          $('#spanText').text('请选择二级分类名');

          $('#imgBox img').remove();

        }
        
        
      }
    });
    
    
  });



});