$(function () {
    (function () {
        function UploadFile(options){
            var deafultOpt={
                action:"",//上传文件的接口地址
                name:"file",//字段名
                file:'',//要上传的文件
                beforeUpload:function () {return true},//上传之前的执行的函数,返回true执行上传操作否则不执行
                success:null,//上传成功的回调函数
                error:null,//上传失败的回调函数
                progress:null//上传失败的回调函数
            }
            this.option=extend(deafultOpt,options);
            this.init();
        }
        UploadFile.prototype={
            init:function () {
                if(this.option.beforeUpload()){
                    this.upLoad();
                }
            },
            upLoad:function () {
                var _this=this;
                var fd = new FormData(),
                    xhr = new XMLHttpRequest();
                fd.append(_this.option.name, _this.option.file);
                xhr.open('post', _this.option.action);
                xhr.onreadystatechange = function(event){
                    if(xhr.status == 200){
                        if(xhr.readyState == 4){
                            console.log('上传成功')
                            _this.option.success&&_this.option.success(xhr.response);
                        }
                    }else{
                        console.log('上传失败');
                        _this.option.error&&_this.option.error(xhr.response);
                    }
                }
                xhr.upload.onprogress = function(event){
                    var pre = Math.floor(100 * event.loaded / event.total);
                    console.log(pre);
                    _this.option.progress&&_this.option.progress(pre);
                }
                xhr.send(fd);
            }
        }
        function cloneObj(oldObj) { //复制对象方法
            if (typeof(oldObj) != 'object') return oldObj;
            if (oldObj == null) return oldObj;
            var newObj = new Object();
            for (var i in oldObj)
                newObj[i] = cloneObj(oldObj[i]);
            return newObj;
        };
        function extend() { //扩展对象
            var args = arguments;
            if (args.length < 2) return;
            var temp = cloneObj(args[0]); //调用复制对象方法
            for (var n = 1; n < args.length; n++) {
                for (var i in args[n]) {
                    temp[i] = args[n][i];
                }
            }
            return temp;
        }
        window.UploadFile=UploadFile;
    })(window)
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
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    $('#myModal').on('shown.bs.modal', function () {
        var image = document.querySelector('.img-container > img');
        var options={
            ready: function () {
                var cropper = this.cropper;
                cropper.setCropBoxData({
                    height: 200,
                    width: 200
                });
            },
            cropmove: function () {

            },
            preview: '.img-preview',
            aspectRatio: 1,//截取窗口的长宽比
            dragMode:"move",
            cropBoxResizable:false,
            viewMode:1
        };
        var cropper = new Cropper(image, options);
        // Import image
        var inputImage = document.getElementById('inputImage');
        inputImage.onchange = function () {
            var files = this.files;
            var file;

            if (cropper && files && files.length) {
                file = files[0];

                if (/^image\/\w+/.test(file.type)) {
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                        image.src = this.result;
                        cropper.destroy();
                        cropper = new Cropper(image, options);
                        inputImage.value = null;
                    }, false);
                    reader.readAsDataURL(file);
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        };
        $('#clipBtn').on('click',function () {
            var canvas=cropper.getCroppedCanvas({width:200,height:200});
            var base64=canvas.toDataURL();
            var blob=dataURLtoBlob(base64)
            new UploadFile({
                action:'/imgUpload',
                name:'file',
                file:blob,
                progress:function (pre) {

                },
                success:function (res) {
                    var result=JSON.parse(res);
                    var arr=result.data.file.path.split("\\")
                    var url=arr[arr.length-1];
                    updatePic(url);
                },
                error:function (res) {
                    console.log(JSON.parse(res));
                }
            })
        })
    })
})