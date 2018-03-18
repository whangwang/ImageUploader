var multer  = require('multer');

module.exports = function (dir_name) {
    return multer({
        dest: dir_name,
        limits: {
            fileSize: 4 * 1024 * 1024, //4MB
        },
        fileFilter: function(req, files, callback) {
            // 只允許jpg|png|jpeg|gif格式的文件
            var type = '|' + files.mimetype.slice(files.mimetype.lastIndexOf('/') + 1) + '|';
            var fileTypeValid = '|jpg|svg+xml|icon|png|jpeg|gif|xlsx|'.indexOf(type) !== -1;

            if(fileTypeValid) {
                callback(null, true);
            } else {
                callback(new Error('Only image(png,jpg,jpeg,gif) files are allowed!'), false);
            }
        }
    });
}
