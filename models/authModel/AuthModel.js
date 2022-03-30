const { model, Schema } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name of user is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email of user is required"],
      trim: true,
      unique: true,
    },
    unHashedPassword: {
      type: String,
    },
    hashedPassword: {
      type: String,
      unique: true,
    },
    pic: {
      type: String,
      required: [true, "Image of user is required"],
    },
    role: {
      type: String,
      enum: ["Buyer", "Seller", "Admin"],
      default: "Buyer",
    },
  },
  { timestamps: true }
);

//Hashing Password Before Save
userSchema.pre("save", async function (req, res, next) {
  const salt = await bcrypt.genSalt(10);
  this.hashedPassword = await bcrypt.hash(this.unHashedPassword, salt);
  this.unHashedPassword = undefined;
  next();
});

module.exports = new model("Users", userSchema);
