

$(function () {

  //获取到地址栏中传来的参数
  function getStr() {
    
    //获取搜索的关键字
    var str = location.search;
    //转码
    str = decodeURI(str);

    console.log(str);
    //去掉问号
    str = str.slice(1);

    //转为数组
    var arr = str.split('=');
    console.log(arr);
    return arr;
    
  }
 
  function render() {
    var arr =  getStr();
    var key = arr[1];
    $('.search_input').val(key);
    
  }

  render();
  
});