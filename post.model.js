// post.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Post
let Reviewer = new Schema({
  kind: {
    type:String
  },
  question: {
    type: String
  },
  answer1: {
    type: String
  },
  answer2: {
    type: String
  },
  answer3: {
    type: String
  },
  answer4: {
    type: String
  },
  correctanswer: {
    type: String
  }
},{
    collection: 'reviewer'
});

module.exports = mongoose.model('Reviewer', Reviewer);