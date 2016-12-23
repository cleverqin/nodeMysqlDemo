$(function () {
    var pc = new PhotoClip('#clipArea', {
        size: 260,
        outputSize: 200,
        //adaptive: ['60%', '80%'],
        file: '#file',
        view: '#view',
        ok: '#clipBtn',
        //img: 'img/mm.jpg',
        loadStart: function() {
            console.log('开始读取照片');
        },
        loadComplete: function() {
            
        },
        done: function(dataURL) {
            upload(dataURL)
        },
        fail: function(msg) {
            alert(msg);
        },
        style:{
            maskColor:"rgba(0,0,0,0.8)"
        }
    });
    function upload(txt) {
        $.ajax({
            url:"/imgUpload",
            type:"POST",
            data:{imgData:txt},
            success:function(data){
                if(data.status!=0){
                    updatePic(data.fileName);
                }else {
                    $.showMsg("图片上传失败");
                }
            },
            error:function () {

            }
        });
    }
    function updatePic(img) {
        $.ajax({
            url:"/updateUserPic",
            type:"POST",
            data:{userPic:img},
            success:function(data){
                if(data.status!=0){
                    window.location.reload();
                }
            },
            error:function () {

            }
        });
    }
})