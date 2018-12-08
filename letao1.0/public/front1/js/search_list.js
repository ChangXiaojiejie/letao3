$(function () {
  var price ;
  var num ;
  var flag;

  //获取搜索关键字
  function getSearStr() {

    //获取地址栏中的地址
    var str = location.search;

    //转码
    str = decodeURI(str);

    //去掉问号
    str = str.slice(1);

    //转为数组
    var arr = str.split('=');

    console.log(arr);

    return arr;
  }
  function render() {

    //获取数组
    var arr = getSearStr();
    var key = arr[1];
    $('.search_input').val(key);

    getSearch();

    

    
  }

  render();

  //给搜索按钮注册事件
  $('.search_btn').click(function () {
    
    getSearch();

    
  });
  
  //封装搜索事件
  function getSearch() {
    // 创建一个空的对象
    var obj = {};
    //将输入框中的值添加到对象中
    obj.proName = $('.search_input').val();
    // 设置默认页码为1，每页显示100条
    obj.page=1;
    obj.pageSize = 100;

    var active = $('.lt_sort a.active');

    if(active.length ===1){
      
      //排序的类型
      var sortType =  active.data('type');
      console.log(sortType);

      //升序还是降序
      var sort = active.find('i').hasClass('fa-angle-down')?'2':'1';

      obj[sortType] = sort;
    }
    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: obj,
      dataType: 'json',
      success: function (info) {

        console.log(info);
        $('.lt_product ul').html(template('pro_tpl',info));
      }
    });

  }

  // 使用价格排序（1升序，2降序）
  // 给价格注册点击事件
  $('.lt_sort a[data-type]').click(function () {
    
    if($(this).hasClass('active')){
      $(this).find('i').toggleClass('fa-angle-up').toggleClass('fa-angle-down');
    }else{
      $(this).addClass('active').siblings().removeClass('active');
    }
    // console.log('触发');
    render();
  });



});