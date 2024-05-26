const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const roles = ["user", "admin", "super-admin"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 55,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 55,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      minlength: 5,
      maxlength: 255,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      maxlength: 30,
    },
    role: {
      type: String,
      enum: {
        values: roles,
        message: "Invalid role",
      },
      default: "user",
      required: true,
    },
    refeshToken: {
      type: String,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// function to hash password
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = bcrypt.hashSync(this.password, 10);

  next();
});
// function to compare password
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
