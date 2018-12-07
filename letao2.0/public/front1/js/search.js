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
  // 2. 删除单个搜索历史
  // 3. 清空所有搜索历史
  // 4. 添加单个搜索历史

  // 1. 获取所有搜索历史, 完成渲染

  // 封装获取本地存储的数组
  function getArr() {
    var jsonStr = localStorage.getItem('search_list');
    var arr = JSON.parse(jsonStr);

    return arr;
  }

  function render() {

    //得到数组
    var arr = getArr()||[];

    var htmlStr = template('searTpl', {
      list: arr
    });
    $('.search_body').html(htmlStr);


  }

  render();

  //2.清空所有数据
  //1.给清空按钮注册点击事件
  //2.弹出提示框
  //3.根据提示框的index值执行不同的操作

  $('.search_body').on('click', '.clearBtn', function () {
    // alert('111111');

    mui.confirm('您确定要清空所有数据么', '文星提示', ['取消', '确定'], function (e) {

      // 1 表示确定  0 表示取消
      if (e.index === 1) {
        //移除变量
        localStorage.removeItem('search_list');
        //重新渲染
        render();

      }

    });

  })

  //3.删除单个，
  //1.注册点击事件，获取当前元素的index值
  //2.获取到存储的数组
  //3.根据index删除数组中指定的数据
  //4.删除完成后，再将数组保存到存储变量中
  $('.search_body').on('click','.btn_delete',function () {
    var index = $(this).data('index');

    //获取数组
    var arr = getArr();

    //删除指定下标下的元素
    arr.splice(index,1);

    //将数组转为JSON字符串
    var jsonStr = JSON.stringify(arr);

    //将jOSN字符串存储到本地存储当中
    localStorage.setItem('search_list',jsonStr);

    //重新渲染
    render();
    
  });

  //添加搜索记录
  //1.点击搜索按钮，获取输入框内的内容
  //2.获取本地存储的数组
  //3判断当前输入的值在数组中是否存在，
  //4.如果存在，先删除这个关键字
  //5.添加当前的关键字到数组的最前面
  //6.判断当前的数组长度是否大于5
  //7.如果当前的数组长度大于5，删除最后面的元素
  //8.重置输入框的内容
  //9.本地跳转拼接关键字
  $('.search_btn').click(function () {
    
    //1.点击搜索按钮，获取输入框内的内容
    var key = $('.search_input').val().trim();
    //1.1判断输入的关键字是否为空
    if(key == ''){
      mui.toast('搜索关键字不能为空哦');
    }
    //2.获取本地存储的数组
    var arr = getArr();
    //3判断当前输入的值在数组中是否存在，
    var flag = arr.indexOf(key);
    //4.如果存在，先删除这个关键字
    if(flag!==-1){
      arr.splice(flag,1);
    }
    //5.添加当前的关键字到数组的最前面
    arr.unshift(key);
    //6.判断当前的数组长度是否大于5
    if(arr.length>5){
      //7.如果当前的数组长度大于5，删除最后面的元素
      arr.pop();
    }

    //8.将数组转为字符串，存储到本地存储当中
    var jsonStr = JSON.stringify(arr);
    //9.将json字符串重新保存到本地变量中
    localStorage.setItem('search_list',jsonStr);
    //10.重置输入框的内容
    $('.search_input').val('');
    //11.重新渲染数据
    render();
    //12.本地跳转拼接关键字
    location.href="search_list.html?key="+key;
  });










});