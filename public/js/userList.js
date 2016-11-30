$(function () {
    $('table tbody tr td button').on("click",function () {
        var $this=$(this);
        var $thisTr=$this.closest("tr");
        var userID=$thisTr.attr('data-id');
        if(confirm("是否确认删除该用户?")){
            $.ajax({
                type:'post',
                data:{userID:userID},
                url:"/delUser",
                success:function (data) {
                    if(data.code==200){
                        $thisTr.remove();
                    }
                }
            })
        }
    })
})