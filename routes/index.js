var express = require('express');
var multer  = require('multer');
var upload = require('../multer_config.js')('./picture/');
var fs = require('fs');
var im = require('imagemagick');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/ajax_upload_image', upload.single('file'), (req, res, next) => {
  if (!req.file) {
          res.json({
              status: false,
              msg: '請選擇檔案!',
          });
      } else {
          var get_url = "http://localhost:3000/display/"+req.file.filename+"/"+String(req.file.mimetype).replace('/','%2F');
          res.json({
              status: true,
              msg: '新增成功!',
              url: get_url
          });
      }
});

router.get('/display/:name/:mime', (req, res, next)=>{

    fs.readFile("picture/" + req.params.name, (err, data) => {
        if (err) {
            fs.readFile("./default.png", (err, data) => {
                if (err) {
                    console.dir(err);
                    next(err);
                } else {
                    res.writeHead(200, { 'Content-Type': "image/png" });
                    res.end(data);
                }
            });
        } else {
          res.writeHead(200, { 'Content-Type': req.params.mime });
          res.end(data);
        }
    });
});

module.exports = router;
