$(function () {
    $('form').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            nickName: {
                validators: {
                    notEmpty: {
                        message: '请输入昵称'
                    },
                    stringLength: {
                        min: 2,
                        max: 12,
                        message: '昵称长度必须在2到12位之间'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '请输入密码'
                    },
                    stringLength: {
                        min: 6,
                        max: 16,
                        message: '密码长度必须在6到16位之间'
                    }
                }
            }
        }
    });
})
