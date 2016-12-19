$(function () {
    $('#loginForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            name: {
                required: "请输入用户名",
                minlength: "用户名必需由两个字母组成"
            },
            password: {
                required: "请输入密码",
                minlength: "密码长度不能小于 5 个字母"
            }
        },
        errorClass:"error",
        errorElement:"div"
    });
    $("#login").on("click",function () {
        if($("form").valid()){
            var user={
                name:$("form input[name='name']").val(),
                password:$("form input[name='password']").val()
            }

            $.ajax({
                url:"/userLogin",
                data:user,
                type:"post",
                success:function (data) {
                    if(data.status==0){
                        $("#form-error").text(data.msg)
                    }else {
                        window.location.href="/";
                    }
                }
            })
        }
    })
})
