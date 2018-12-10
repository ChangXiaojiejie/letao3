$(function () {

  // 由于所有的功能都是对于本地存储的操作, 可以约定一个键名: search_list

  /*
    下面三句话, 用于在控制台执行, 添加假数据
    var arr = ["张三", "李四", "王五", "赵六" ];
    var jsonStr = JSON.stringify( arr );
    localStorage.setItem( 'search_list', jsonStr );
  */


  // 功能分析
  // 1. 获取所有搜索历史, 完成渲染
  // 2. 清空所有搜索历史
  // 3. 删除单个搜索历史
  // 4. 添加单个搜索历史


  //1.获取本地存储的数据
  function getlocaStrong() {

    //获取本地存储的json字符串
    var str = localStorage.getItem('search_list');
    console.log(str);



    //将json字符串转为数组
    var arr = JSON.parse(str);
    arr = arr || [];
    console.log(arr);

    // 将数组包装成对象传入到模板引擎中
    $('.lt_history').html(template('sear_tpl', {
      list: arr
    }));
  }
  getlocaStrong();

  //2.清空所有的记录
  //给清空按钮注册点击事件
  $('.lt_history').on('click', '.clear_btn', function () {

    //弹出提示框
    mui.confirm('你确定要清空所有记录么', '文星提示', ['确定', '取消'], function (e) {

      console.log(e.index);
      if (e.index == 0) {
        //移除本地存储
        localStorage.removeItem('search_list');

        //重新刷新页面
        getlocaStrong();

      }
    });


  });

  //3.删除单个记录
  //实现的思路：
  //1.首先将获取到当前删除的索引
  //2.获取到本地存储，将其转为数组
  //3.根据获取到的索引删除对应位置的数据
  //4.将数组再转为json字符串重新存储到本地
  //5.重新渲染当前的本地存储的数据
  $('.lt_history').on('click', '.btn_delete', function () {
    //1.首先将获取到当前删除的索引
    var index = $(this).data('id');
    //2.获取到本地存储，将其转为数组
    var arr = JSON.parse(localStorage.getItem('search_list'));
    //3.根据获取到的索引删除对应位置的数据
    arr.splice(index, 1);
    //4.将数组再转为json字符串重新存储到本地
    localStorage.setItem('search_list', JSON.stringify(arr));
    //5.重新渲染当前的本地存储的数据
    getlocaStrong();

  });

  // 4. 添加单个搜索历史
  //获取当前存储，将json字符串转为数组
  //往数组的头部添加数据
  //再将数组转为json字符串，存储到本地
  //重新渲染本地存储
  $('.search_btn').click(function () {
    //获取当前输入框的内容
    var val = $('.search_input').val().trim();

    //判断当前输入内容是否为空
    if (val.length == 0) {
      mui.toast('搜索内容不能为空');
      return;
    }

    //获取当前存储，将json字符串转为数组
    var arr = JSON.parse(localStorage.getItem('search_list'));

    //判断本地存储中，是否包含该关键字
    var index = arr.indexOf(val);
    //如果包含，删除该关键字
    if (index != -1) {
      arr.splice(index, 1);
    }
    //往数组的头部添加数据
    arr.unshift(val);

    //判断当前数组长度是否为10，超过十条元素，删除数组后面的元素
    if (arr.length > 5) {
      arr.pop();
    }
    //再将数组转为json字符串，存储到本地
    localStorage.setItem('search_list', JSON.stringify(arr));
    //重新渲染本地存储
    getlocaStrong();
    //重置输入框
    $('.search_input').val(' ');

    //跳转到搜索列表页
    location.href = "search_list.html?key=" + val;


  });
});