$(function () {
    $('table tbody tr td button').on("click",function () {
        var $this=$(this);
        var $thisTr=$this.closest("tr");
        var userID=$thisTr.attr('data-id');
        $.alterConfirm({
            title:"是否删除该用户?",
            callBack:function () {
                $.ajax({
                    type:'post',
                    data:{userID:userID},
                    url:"/delUser",
                    success:function (data) {
                        if(data.code==200){
                            $thisTr.remove();
                            $.jGrowl("删除成功！", {
                                theme: 'success',
                                header:"提示",
                                speed: 'slow'
                            });
                        }
                    }
                })
            }
        })
    })
})