

$(function () {

  function render() {
    
    $.ajax({
      type:'get',
      dataType:'json',
      url:'/cart/queryCart',
      success:function (info) {
        
        console.log(info);
        $('.lt_main ul').html(template('pro_tpl',{list:info}));
        
        
      }
    });
    
  } 

  render();
  
  
})