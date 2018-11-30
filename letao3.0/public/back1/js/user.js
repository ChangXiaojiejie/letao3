/********设置用户管理的 */

$(function () {
  
  var currPage = 1;
  var pageSize = 5;

  //封装获取数数据方法，发送ajax请求
  function render() {
    
    $.ajax({
      type:'get',
      data:{
        page:currPage,
        pageSize:pageSize
      },
      url:'/user/queryUser',
      dataType:'json',
      success:function (info) {
        
        //绑定模板
        var htmlStr = template('tmp',info);
        $('tbody').html(htmlStr);
        console.log(info);
      }
    });
    
  }
  render();

  //给a标签注册事件，点击按钮弹出模态框
  $('tbody').on('click','.btn',function () {
    // alert('触发');
    //显示模态框
    $('#Updata').modal('show');
  });

  //点击确定按钮


  
});