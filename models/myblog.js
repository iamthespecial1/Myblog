const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var currentdate = new Date();
var d = currentdate.getDate() + "-" + (currentdate.getMonth() + 1) + "-" + currentdate.getFullYear()

// User Schema
const myBlogSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  replies: {
    type: Array,
    default: []
    /* 
    obj={
      id
author
reply
    }
    */
  },

}, { usePushEach: true });

const Blog = module.exports = mongoose.model('myblog', myBlogSchema, 'myblog');
