const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Blog = require('../models/myblog');
var multer = require('multer'),
    fs = require('fs');
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

var upload = multer({
    storage: storage,
    limits: { fileSize: '50mb' }
})

router.get('/', function (req, res, next) {
    var ph = [];
    Blog.find()
        .sort({ sortdate: -1 })
        .exec(function (err, items, next) {
        if (err)
            res.send(err);
        else {
            let count = 0;
            for (let item of items) {
                fs.readFile(item.img, function (err, content) {
                    count++;
                    if (err) console.log(err);
                    item.img = new Buffer(content).toString('base64');
                    //console.log(item.img)

                    if (count == items.length) {
                        res.send(items)

                    }
                });
            }
            //res.json(items);


        }
    });
});

router.get('/get', function (req, res) {
    Blog.find()
        .sort({ sortdate: -1 })
        .limit(3)
        .exec(function (err, items, next) {
            if (err)
                res.send(err);
            else {
                let count = 0;
                for (let item of items) {
                    fs.readFile(item.img, function (err, content) {
                        count++;
                        if (err) console.log(err);
                        item.img = new Buffer(content).toString('base64');
                        //console.log(count)

                        if (count == items.length) {
                            res.send(items)

                        }
                    });
                }
            }
        });
});

router.get('/:title', function (req, res) {
    /*BookApi.getBookById(req.params.id, function(err, book) {
      //res.render('book/edit', {book: book});
      res.json(book);
    });*/
    Blog.findOne({ title: req.params.title }, function (err, item) {

        if (err)
            res.send(err);
        else
           // console.log(item);
        res.send(item);


    });

});
//, upload.single('img')
router.post('/postdata', upload.single('img'), function (req, res, next) {
    let blog = new Blog();
    blog.title = req.body.title;
    blog.author = req.body.author;
    blog.editor = req.body.editor;
    blog.img = req.file.destination + '/' + req.file.filename;
    blog.category=req.body.cat;
    console.log(req);
    blog.save(function (err, blog) {

        if (err) {
            res.send(err);
            res.json("failed to add");
        }
        else {

            res.json(blog);
        }
    });

});
module.exports = router;