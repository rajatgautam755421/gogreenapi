const { Schema, model } = require("mongoose");

const blogSchema = Schema({
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "BlogModel",
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  dateOfComment: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new model("CommentBlogModel", blogSchema);
