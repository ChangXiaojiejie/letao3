
//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:500//自动轮播周期，若为0则不自动播放，默认为0；
});

// 区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false
});


  //获取到地址栏中传来的参数
  function getStr() {
    
    //获取搜索的关键字
    var str = location.search;
    //转码
    str = decodeURI(str);

    // console.log(str);
    //去掉问号
    str = str.slice(1);

    //转为数组
    var arr = str.split('=');
    // console.log(arr);
    $('.search_input').val(arr[1]);
    return arr;
  }