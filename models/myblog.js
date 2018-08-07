const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var currentdate = new Date();
var d = currentdate.getDate() + "-"+ (currentdate.getMonth()+1)  + "-" + currentdate.getFullYear()

// User Schema
const myBlogSchema = mongoose.Schema({
  title: {
    type: String,
    required:true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: d
  },
  sortdate: {
    type: Date,
    default: Date.now
  },
  editor: {
    type: String,
    required: true
  },
  img: 
      { 
        type: String
      },
  category:{
    type: String,
    required: true
  }
});

const Blog = module.exports = mongoose.model('myblog', myBlogSchema,'myblog');
