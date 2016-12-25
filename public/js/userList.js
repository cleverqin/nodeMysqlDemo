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
    $("#pageNavBox").createPage({
        pageCount:parseInt(pageCount),
        current:parseInt(current),
        backFn:function(p){
            var pageSize=getQueryString('pageSize');
            if(!pageSize){
                pageSize=10;
            }
            window.location.href="/user/list?pageNum="+p+"&&pageSize="+pageSize;
        }
    });
    function getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    }
})