/*******商品管理 */

$(function () {

  //声明变量
  var currPage = 1;
  var pageSize = 3;
  var picArr = [];



  //初始化渲染数据
  function render() {
    $.ajax({
      type: 'get',
      data: {
        page: currPage,
        pageSize: pageSize
      },
      dataType: 'json',
      url: '/product/queryProductDetailList',
      success: function (info) {

        // console.log(info);
        //渲染数据
        var htmlStr = template('proTel', info);
        $('tbody').html(htmlStr);
        //c初始化分页标签
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本，如果是3，必须指定
          currentPage: currPage, //指定当前页
          totalPages: Math.ceil(info.total / pageSize), //指定总页数
          onPageClicked: function (a, b, c, page) {
            console.log(page);

            //page指的是点击的页码,修改了当前页
            currPage = page;
            //重新渲染
            render();
          }
        });

      }
    });

  }

  render();

  //给添加商品注册事件。弹出模态框
  $('.addBtn').click(function () {

    //显示模态框
    $('#addModal').modal('show');

    //发送ajax请求，获取二级分类信息
    $.ajax({
      type: 'get',
      data: {
        page: 1,
        pageSize: 1000,
      },
      dataType: 'json',
      url: '/category/querySecondCategoryPaging',
      success: function (info) {
        // console.log(info);
        //绑定模板
        var htmlStr = template('senTel', info);
        $('.dropdown-menu').html(htmlStr);
      }
    });


  });

  //给二级分类的a标签注册点击事件 替换按钮文字和添加隐藏域的val值 同时修改表单的状态
  $('.dropdown-menu').on('click', 'a', function () {

    // 替换按钮文字
    var txt = $(this).text();
    $('#dropdownText').text(txt);
    // console.log(txt);


    // 添加隐藏域
    var id = $(this).data('id');
    $('[name="brandId"]').val(id);
    // console.log(id);

    // 同时修改表单的状态
    $('#form').data('bootstrapValidator').updateStatus('brandId', "VALID");



  })

  //添加表单验证 
  /***
   * 文字类型 非空验证
   * 
   * 库存 正则数字验证+非空
   * 尺寸 正则格式验证 +非空
   */

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

    fields: {
      //验证二级分类id
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      //验证请输入商品名称
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      //请输入商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      //请输入商品库存
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存格式，非0开头的数字'
          }
        }
      },
      //请输入商品尺码
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '尺寸格式，xx-xx，例如：36-45'
          }
        }
      },
      //请输入商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      //请输入商品现价
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      //请选择三张图片
      picStatus: {
        validators: {
          notEmpty: {
            message: "请选择三张图片"
          }
        }
      },


    }

  });

  //处理图片问题
  // 图片初始
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function (e, data) {

      console.log(data);

      //将上传的图片的地址和名称都存放到这个数组中
      picArr.push(data.result);
      console.log(picArr);

      //将上传的图片动态的添加到imgBox中去
      $('#imgBox').prepend('<img src="' + data.result.picAddr + '" width="100">');

      //如果超过三张，添加第一张，删除最后一张，
      if (picArr.length > 3) {
        //删除数组中最后一个
        picArr.pop();

        //删除页面上的最后一个图片
        $('#imgBox img:last-of-type').remove();

      }

      //当前选择的图片等于三张改变图片验证的状态
      if(picArr.length ===3){
        $('#form').data('bootstrapValidator').updateStatus('picStatus','VALID');
      }
      //
      // console.log('打印');
    }
  });

  //阻止浏览器的默认提交，由ajax发送请求
  $('#form').on('success.form.bv',function (e) {

    //阻止浏览器的默认行为
    e.preventDefault();

    // 准备上传的数据
    var data = $('#form').serialize();
    console.log(picArr);
    data += "&picAddr1="+picArr[0].picAddr+"&picName1="+picArr[0].picName;
    data += "&picAddr2="+picArr[1].picAddr+"&picName2="+picArr[1].picName;
    data += "&picAddr3="+picArr[2].picAddr+"&picName3="+picArr[2].picName;

    //发送ajax请求
    $.ajax({

      type: 'post',
      data:data,
      url:'/product/addProduct',
      dataType:'json',
      success:function (info) {
        
        // console.log(info);
        //添加成功
        //关闭模态框
        $('#addModal').modal('hide');

        //渲染第一页
        currPage = 1;
        render();

        //重置表单内容和状态
        $('#form').data('bootstrapValidator').resetForm(true);

        //手动重置按钮和图片
        $('#dropdownText').text('请选择二级分类');
        $('#imgBox img').remove();
        
        
      }




    });
    // console.log(data);
    



    
    
    

    

    //
    
    
  });











});