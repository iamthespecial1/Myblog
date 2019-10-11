const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: 'User registered' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({ data: user }, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            username: user.username,
          }
        })
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

router.get('/count', function (req, res, next) {
  console.log("Hiii")
  User.find().count(function (err, count) {
    if (err)
      res.send(err)
    else
      res.send(`${count}`)
  });

});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  res.json({ user: req.user });
});
//getAllUser
router.get('/usersList', function (req, res) {
  User.find(function (err, items, next) {

    // if there is an error retrieving, send the error. 
    // nothing after res.send(err) will execute
    if (err)
      res.send(err);
    else {
      // console.log(items);
      res.json(items);
    }


  });

});
router.get('/:username', function (req, res) {
  User.findOne({ username: req.params.username }, function (err, user) {

    // if there is an error retrieving, send the error. 
    // nothing after res.send(err) will execute
    if (err)
      res.send(err);
    else
      //console.log(books);
      res.json(user);

    /*db.close(function(){
console.log("close");
    });*/

  });

});
router.put('/:username', function (req, res) {
  var updatedUser = {};
  /*updatedUser.username = req.body.username;
  updatedUser.role = req.body.role;*/

  User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true }, function (err, updatedUser) {
    if (err)
      res.send(err);
    else {
      res.json(updatedUser);
      console.log(updatedUser)
    }
  });

});

module.exports = router;
