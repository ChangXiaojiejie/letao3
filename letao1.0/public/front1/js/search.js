$(function () {

  //封装

    // 由于所有的功能都是对于本地存储的操作, 可以约定一个键名: search_list

  /*
    下面三句话, 用于在控制台执行, 添加假数据
    var arr = ["张三", "李四", "王五", "赵六" ];
    var jsonStr = JSON.stringify( arr );
    localStorage.setItem( 'search_list', jsonStr );
  */


  // 功能分析
  // 1. 获取所有搜索历史, 完成渲染
  // 2. 删除单个搜索历史
  // 3. 清空所有搜索历史
  // 4. 添加单个搜索历史

  getJsonArr();

  //获取json字符串
  function getJsonArr() {
    var jsonStr = localStorage.getItem('search_list');
    var arr = JSON.parse(jsonStr);
    // console.log(arr);
  
    return arr;
  }

  //封装渲染函数
  function render() {
    var arr = getJsonArr()|| [];
    //发送ajax请求
    var info = {list:arr}
    
    var htmlStr = template('historyTpl',info);
    $('.history_body').html(htmlStr);
    
  }

  render();

  // 2. 删除单个搜索历史

  // 给每个a标签注册事件点击事件
  $('.history_body').on('click','.btn_delete',function () {
    //获取当前的索引
    var index = $(this).data('index');
    console.log(index);
    
    //获取数组
    var arr = getJsonArr()

    // console.log(arr);
    
    //删除指定索引下的数据
    arr.splice(index,1);

    //将数组转为json字符串，存储到本地存储中
    var jsonStr = JSON.stringify(arr);
    console.log(jsonStr);
    
    localStorage.setItem('search_list',jsonStr);

    //重新渲染
    render();
    
  });

  //3.清空历史记录
  $('.history_body').on('click','.allDelete',function () {
    
    //弹出提示框
    mui.confirm('你确定要清空所有记录么','温馨提示',['取消','确定'],function (e) {
      
      console.log(e);
      // 1 表示确定
      //0 表示 取消
      if(e.index===1){
        //清空本地存储，也就是移除
        localStorage.removeItem('search_list');
      }
      render();
      
    });
    
  });

  //4.添加存储
  
  $('.search_btn').click(function () {
    
    //获取输入框的内容
    var text = $('.search_input').val().trim();

    //判断是否为空
    if(text===''){
      mui.toast('搜索不能为空哦');
      return;
    }


    
    //获取数组
    var arr = getJsonArr();

    //判断当前输入的关键字是否存在
    var strIndex = arr.indexOf(text);
    console.log(strIndex);
    console.log(arr);
    
    
    if(strIndex!==-1){
      arr.splice(strIndex,1);
    }
    console.log(arr);
    
    
    //往头部添加数据
    arr.unshift(text);

    //判断数组长度是否大于5
    if(arr.length>5){
      arr.pop();
    }
    console.log(arr);

    //将数组转为jsonstr
    var jsonStr = JSON.stringify(arr);
    console.log(jsonStr);
    
    localStorage.setItem('search_list',jsonStr);

    //刷新当前页面
    render();

    //清空输入框
    $('.search_input').val('');

    //跳转
    location.href = "search_list.html?key="+text;

  });





  




  
  
});