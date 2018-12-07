/********商品管理的js样式 */

$(function() {
  //声明变量
  var currPage = 1;
  var pageSize = 5;
  var picArr = [];

  //封装商品渲染的函数
  function render() {
    $.ajax({
      url: "/product/queryProductDetailList",
      type: "get",
      data: {
        page: currPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(info) {
        console.log(info);

        //绑定模板
        var htmlStr = template("proTel", info);
        $("tbody").html(htmlStr);

        //分页标签初始化
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function(event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            currPage = page;

            render();
          }
        });
      }
    });
  }

  render();

  //给添加商品按钮注册事件，打开模态框
  $(".addBtn").click(function() {
    //显示模态框
    $("#addPro").modal("show");

    //发送ajax请求，渲染二级分类数据
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 1000
      },
      dataType: "json",
      success: function(info) {
        // console.log(info);
        var htmlStr = template("senTel", info);
        $(".dropdown-menu").html(htmlStr);
      }
    });
  });

  //给二级菜单a标签注册事件
  $(".dropdown-menu").on("click", "a", function() {
    var txt = $(this).text();
    var id = $(this).data("id");
    //给按钮替换文本
    $("#firTxt").text(txt);
    //给隐藏域添加val
    $('[name="brandId"]').val(id);
    //修改状态框
    $("#form")
      .data("bootstrapValidator")
      .updateStatus("brandId", "VALID");
  });

  //给表单注册验证
  $("#form").bootstrapValidator({
    //过滤，选择不过滤
    excluded: [""],

    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },

    fields: {
      //请选择二级分类
      brandId: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      //请输入商品名称
      proName: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      //请输入商品描述
      proDesc: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      //请输入商品库存
      num: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "库存格式，不能以0开头的数字"
          }
        }
      },
      //请输入商品尺码
      size: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "尺寸格式，请以xx-xx,例如12-19"
          }
        }
      },
      //请输入商品原价
      oldPrice: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      //请输入商品现价
      price: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      //请选择三张图片
      picStatu: {
        validators: {
          //不能为空
          notEmpty: {
            message: "请选择三张图片"
          }
        }
      }
    }
  });

  //上传图片初始化
  $("#fileupload").fileupload({
    dataType: "json",
    //e：事件对象
    //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
    done: function(e, data) {
      console.log(data.result);
      //将图片的地址和名称保存在数组中
      var picObj = data.result;
      picArr.unshift(picObj);

      //先转存图片
      var url = picObj.picAddr;
      console.log(url);

      //获取到当前图片的地址，动态创建img
      $("#imgBox").prepend('<img src="' + url + '" style="width:100px">');

      if (picArr.length > 3) {
        //在在数组中删除最后一个元素
        picArr.pop();

        //在页面上中删除最后一个元素
        $("#imgBox img:last-of-type").remove();
      }
      //如果上传的图片等于3张，那么改变当前的图片状态
      if (picArr.length == 3) {
        $("#form")
          .data("bootstrapValidator")
          .updateStatus("picStatu", "VALID");
      }
    }
  });

  //阻止浏览器的默认提交表单，使用ajax提交
  $('form').on('success.form.bv',function (e) {

    //阻止浏览器的默认提交
    e.preventDefault();

    //准备发送的数据
    var data = $('#form').serialize();
    
    data += "&picName1"+picArr[0].picName+"&picAddr1"+picArr[0].picAddr;
    data += "&picName2"+picArr[1].picName+"&picAddr2"+picArr[1].picAddr;
    data += "&picName3"+picArr[2].picName+"&picAddr3"+picArr[2].picAddr;

    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      dataType:'json',
      success:function (info) {
        
        // console.log(info);
        if(info.success){
          //关闭模态框
          $('#addPro').modal('hide');

          //渲染第一页
          currPage = 1;
          render();

          //重置表单内容和状态
          $('#form').data('bootstrapValidator').resetForm(true);

          //手动手指按钮和图片     
          $('#firTxt').text('请选择二级分类');
          $('#imgBox img').remove();     
        }
        
        
      }
    });
    
    
  });


});
