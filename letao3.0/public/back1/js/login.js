$(function() {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $("#form").bootstrapValidator({
    //设置小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  
  //设置校验规则
  fields:{
    
    username:{
        validators:{
            notEmpty:{
                message:"请输入用户名"
            },
          	stringLength:{
                min:2,
              	max:6,
              	message:"用户名的长度必须为2到6位"
            }
        }
    },
    password:{
      validators:{
        notEmpty:{
            message:"请输入密码"
        },
        stringLength:{
            min:6,
            max:12,
            message:"密码长度必须为6到12位"
        }
      }
    },
    
  }
  
});


  /*
  * 2. 校验成功后, 会触发一个事件, 表单校验成功事件
  *    默认是会提交表单的, 页面就跳转了,
  *    我们需要注册表单校验成功事件, 在成功事件中, 阻止默认的提交, 通过 ajax 提交
  * */
 $("#form").on("success.form.bv", function(e){
  //阻止表单的默认提交
    e.preventDefault();

    $.ajax({
      type:"post",
      url:"/employee/employeeLogin",
      data:$('#form').serialize(),
      dataType:"json",
      success:function(info){
        // console.log(info);
        if(info.error ===1000){
          alert(info.message);
        }else if(info.error===1001){
          alert(info.message);
        }
        if(info.success){
          location.href = "index.html";
        }
        
      }
    });
  
  });




  /*
  * 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态
  * */
  $('[type="reset"]').on('click',function () {
   
      //重置表单样式
      $("#form").data("bootstrapValidator").resetForm();
    
  })
  

})