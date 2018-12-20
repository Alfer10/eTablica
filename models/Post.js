const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  position: {
    type: Number
  },
  size: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
