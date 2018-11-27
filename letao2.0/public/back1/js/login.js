
//完成表单验证
$(function () {

  //表单验证
  $('#form').bootstrapValidator({
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
              	message:"用户名长度必须为2到6位"
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
    }
    
  }
  
  });

  //阻止浏览器的默认行为
  $('#form').on('success.form.bv',function (e) {
    
    e.preventDefault();

    //使用ajax发送请求
    $.ajax({
      type: 'post',
      url:'/employee/employeeLogin',
      data : $('#form').serialize(),
      dataType:'json',
      success : function (info) {
        
        console.log(info);
        if(info.error===1000){
          alert('用户名不存在');
        }
        else if(info.error ===1001){
          alert('密码错误');
        }
        if(info.success){
          location.href = "index.html";
        }
        
      }
    });

    
  });

  //重置表单的内容
  $("[type='reset']").on("click", function(){
  
    //重置表单样式
    $("#form").data("bootstrapValidator").resetForm();
    
  });
  
  
});