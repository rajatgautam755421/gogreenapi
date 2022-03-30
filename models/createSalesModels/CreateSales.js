const { Schema, model } = require("mongoose");

const createSalesSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    product_image: {
      type: String,
      required: [true, "Image of product is required"],
    },
    product_desc: {
      type: String,
      required: [true, "Description of product is required"],
    },
    product_price: {
      type: String,
      required: [true, "Price of product is required"],
    },
    product_amount: {
      type: String,
      required: [true, "Amount of product is required"],
    },
    location: {
      type: String,
      required: [true, "Location of product is required"],
    },
  },
  { timestamps: true }
);

module.exports = new model("CreateSales", createSalesSchema);
