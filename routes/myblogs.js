const express = require('express');
const router = express.Router();
var uniqid = require('uniqid');
const Blog = require('../models/myblog');
var multer = require('multer'),
    fs = require('fs');
var path = require('path');
var helper = require("./helper")
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

// router.get('/', function (req, res, next) {
//     var ph = [];
//     Blog.find()
//         .sort({ sortdate: -1 })
//         .exec(function (err, items, next) {
//             if (err)
//                 res.send(err);
//             else {
//                 let count = 0;
//                 for (let item of items) {
//                     fs.readFile(item.img, function (err, content) {
//                         count++;
//                         if (err) console.log(err);
//                         item.img = new Buffer(content).toString('base64');
//                         //console.log(item.img)

//                         if (count == items.length) {
//                             res.send(items)
//                         }
//                     });
//                 }
//                 //res.json(items);


//             }
//         });
// });

router.get('/getAll', function (req, res) {
    Blog.find()
        .exec(function (err, items, next) {
            if (err)
                res.send(err);
            else {
                res.send(items)
            }
        });
});

router.get('/:id', function (req, res) {
    /*BookApi.getBookById(req.params.id, function(err, book) {
      //res.render('book/edit', {book: book});
      res.json(book);
    });*/
    Blog.findById({ _id: req.params.id }, function (err, item) {

        if (err)
            res.send(err);
        else
            // console.log(item);
            res.send(item);


    });

});
//, upload.single('img')
router.post('/postdata', function (req, res, next) {
    let blog = new Blog();
    blog.comment = req.body.comment;
    blog.author = req.body.author;
    blog.authorName = req.body.authorName;
    blog.replies = []
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

router.put('/addReply', function (req, res, next) {
    let addCom = {
        _id: uniqid(),
        author: req.body.author,
        authorName: req.body.authorName,
        comment: req.body.comment,
        replies: []
    };
    console.log(req);
    Blog.findById({ _id: req.body._id }, function (err, result) {

        if (err)
            res.send(err);
        else {
            if (!req.body.replyId) {
                result.replies.push(addCom)

            }
            else {

                result.replies = [...helper.findtheId(result, req.body.replyId, addCom)]
            }
            result.save(function (err, blog) {

                if (err) {
                    res.send(err);
                    res.json("failed to add reply");
                }
                else {
                    res.json(blog);
                }
            });
        }

    });

});


router.put('/editMyComment', function (req, res) {
    if (!req.body.editId) {
        Blog.findOneAndUpdate({ _id: req.body.id }, { comment: req.body.comment }, { new: true }, function (err, updated) {
            if (err)
                res.send(err);
            else {
                res.json(updated);
                console.log(updated)
            }
        });
    }
    else {
        Blog.findById({ _id: req.body.id }, function (err, result) {

            if (err)
                res.send(err);
            else {
                let edit = helper.findToEdit(result, req.body.editId, req.body.comment)
                result.replies = [...edit]
                result.save(function (err, blog) {

                    if (err) {
                        res.send(err);
                        res.json("failed to add reply");
                    }
                    else {
                        res.json(blog);
                    }
                });
            }

        });
    }

});
module.exports = router;