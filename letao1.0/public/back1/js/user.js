$(function () {
  /********获取数据**** */
  var currentPage = 1;
  var pageSize = 6;
  function retrieve() {
   
    $.ajax({
      type: 'GET',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      url: "/user/queryUser",
      success: function (info) {

        console.log(info);
        
        // console.log(rows);
       
        var html = template('tmp_user', info);
        $('tbody').html(html);


        //初始化分页标签

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3, //指定bootstrap的版本，如果是3，必须指定
          currentPage: currentPage, //指定当前页
          totalPages: Math.ceil(info.total / pageSize), //指定总页数
          onPageClicked: function (a, b, c, page) {
            console.log(page);
            
            //page指的是点击的页码,修改了当前页
            currentPage = page;
            //重新渲染
            retrieve();
          }
        });

      }
    });
  }
  //自调用
  retrieve();


  /**********修改状态 */
  /***
   * 1.给启用和禁用注册点击事件
   * 2.点击弹出模态框
   * 3.点击确定 获取当前按钮的属性，根据属性判断是执行启用还是禁用
   * 4.发送ajax请求
   * 
   * 
   */
  $('tbody').on('click','.btn',function () {
    

    //开启模态框
    $('#update').modal('show');

    //将this保存
    var that = this;

    $('#sure').click(function () {
      
      var flag ;
      var isDelete;
      if(that.classList.contains('btn-danger')){
        // console.log(that);
        isDelete=0;
        
      }else if(that.classList.contains('btn-success')){
        // console.log(that);
        isDelete=1;
        // console.log('我是启用，我要开启禁用');
      }
      var id =$(that).parent().data('id');

      $.ajax({
        url:'/user/updateUser',
        type:'post',
        data:{
          id : id,
          isDelete:isDelete
        },
        success:function (info) {
          
          // console.log(info);
          if(info.success){
            $('#update').modal('hide');
            retrieve();
          }else if(info.error){
            alert('修改状态失败');

          }
        }
      })
    });

    

    
    
  })








});