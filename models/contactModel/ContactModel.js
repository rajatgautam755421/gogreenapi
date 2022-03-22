const { model, Schema } = require("mongoose");

const contactSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = new model("Contact", contactSchema);
