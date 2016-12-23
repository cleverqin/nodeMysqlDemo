exports.index = function(req, res) {
    res.render('index', {
        title: '首页'
    })
}
// exports.imgUpLoad = function(req, res) {
//     var des_file = "./public/static/images/" + req.files[0].filename;
//     fs.readFile( req.files[0].path, function (err, data) {
//         fs.writeFile(des_file, data, function (err) {
//             if( err ){
//                 var response = {
//                     status:0,
//                     message:req.files[0].originalname+'图片上传失败！',
//                     filename:""
//                 };
//             }else{
//                 response = {
//                     status:0,
//                     message:req.files[0].originalname+'图片上传失败！',
//                     filename:req.files[0].filename
//                 };
//             }
//             res.json(response);
//         });
//     });
// }