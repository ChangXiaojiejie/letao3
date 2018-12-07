$(function () {

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
    // var arr = getSearStr();
    // var key = arr[1];
    // $('.search_input').val(key);
    // console.log(arr);
    var jsonStr = localStorage.getItem('search_list');

    //JSON.parse 将json字符串转为数组或者其他复杂数据类型
    var arr = JSON.parse(jsonStr);
    console.log(arr);
    $('.history_body').html(template('historyTpl',{list:arr}));
    
  }

  render();

  $('.search_btn').click(function () {
    
    getSearch();

    
  });
  
  function getSearch() {

    var obj = {};
    obj.proName = $('.search_input').val();
    console.log();
    
    obj.page=1;
    obj.pageSize = 100;
    //发送ajax请求
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: obj,
      dataType: 'json',
      success: function (info) {

        console.log(info);


      }
    });

  }


});