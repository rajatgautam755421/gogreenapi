const { Schema, model } = require("mongoose");

const blogSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateOfUpload: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new model("BlogModel", blogSchema);
