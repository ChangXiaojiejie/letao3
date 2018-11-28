$(function () {

  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $('#form').bootstrapValidator({
    feedbackIcons: {
      //设置验证通过的
      valid: 'glyphicon glyphicon-ok',
      //验证失败的
      invalid: 'glyphicon glyphicon-remove',
      //正在验证的
      validating: 'glyphicon glyphicon-refresh'
    },
    //bootstrapValidator校验内容的方法
    fields: {
      // 校验的参数
      username: {
        // 校验的规则
        validators: {
          // /非空校验
          notEmpty: {
            message: "请输入用户名"
          },
          //长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "输入的用户名必须是2到6位"
          },
          callback:{
            message : "用户名不存在"
          }
        }
      },
      password: {
        //校验规则
        validators: {
          //非空校验
          notEmpty: {
            message: '请输入密码'
          },
          //长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '输入的密码必须是6到12位'
          },
          callback:{
            message:"密码错误"
          }
        },
      }
    }
  });



  /*
   * 2. 校验成功后, 会触发一个事件, 表单校验成功事件
   *    默认是会提交表单的, 页面就跳转了,
   *    我们需要注册表单校验成功事件, 在成功事件中, 阻止默认的提交, 通过 ajax 提交
   * */

   $("#form").on('success.form.bv',function (e) {

    //阻止浏览器的默认跳转
    e.preventDefault();

    //发送ajax请求
    $.ajax({
      type:'post',
      url:'/employee/employeeLogin',
      data:$('#form').serialize(),
      dataType:'json',
      success:function (info) {
        
        console.log(info);
        if(info.error===1000){
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID","callback" )
        }else if(info.error === 1001){
          $("#form").data("bootstrapValidator").updateStatus("password", "INVALID", "callback")
        }
        else if(info.success){
          location.href = "index.html";
        }
      },
      
    });
     
   });

  /*
   * 3. 重置功能, 本身重置按钮, 就可以重置内容, 需要额外的重置状态*/
   $('[type="reset"]').on('click',function () {
     
    //重置表单的输入框的状态
     $('#form').data('bootstrapValidator').resetForm();
   });










});