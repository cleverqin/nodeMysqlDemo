$(function () {
    $('table tbody tr td button.del').on("click",function () {
        var $this=$(this);
        var $thisTr=$this.closest("tr");
        var userID=$thisTr.attr('data-id');
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
    })
    $('table tbody tr td button.del').popConfirm({
        title: "提示",
        content: "你确定要删除吗？",
        placement: "left"
    });
})