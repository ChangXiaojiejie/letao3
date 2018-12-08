

$(function () {




 
  function render(key) {
    getStr();
    key = key|| $('.search_input').val() ;

    //定义一个对象，将该对象作为发送ajax的数据
    var obj = {};
    obj.proName= key;
    obj.page = 1;
    obj.pageSize = 100;

    //判断当前是否需要排序
    var $sort = $('.lt_sort a.current');
    if($sort.length===1){
      // console.log('需要排序');
      //排序的类型
      var type = $sort.data('type');
      // console.log(type);

      //升序还是降序
      var num = $sort.find('i').hasClass('fa-angle-down')?'2':'1';

      // console.log(num);
      obj[type]=num;
    }


    //发送ajax请求
    $.ajax({
      type:'get',
      url:'/product/queryProduct',
      data:obj,
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        $('.lt_product ul').html(template('pro_Tpl',info));
        
      }
    });
  }

  render();

  //2.给搜索按钮注册点击事件
  $('.search_btn').click(function () {
    //获取当前输入框的内容
    var key = $('.search_input').val();

    //将值传入到render中
    render(key);
  });

  //3.给data-type的元素注册事件
  $('.lt_sort a[data-type]').click(function () {
    
    if($(this).hasClass('current')){
      
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
      
    }else{
      $('.lt_sort a').removeClass('current');
      $(this).addClass('current');
    } 
    
  });

  
});