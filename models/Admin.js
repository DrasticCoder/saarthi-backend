import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from 'jsonwebtoken'

const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name."],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name."],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address."],
      validate: validator.isEmail,
      unique: [true, "Please use official email address."],
    },
    phone: {
      type: Number,
      required: [true, "Please enter your phone number."],
      minLength: [10, "Please enter valid phone number."],
    },
    password: {
      type: String,
      required: [true, "Please enter your password."],
      minLength: [8, "Password must be greater than 8 characters."],
      select: false,
    },
    type: {
      type: String,
      default: "admin",
    },
    role: {
      type: String,
      enum: ["admin", "sub-admin"],
      default: "admin",
    },
    status: {
      type: Boolean,
      default: true,
    },
    profile: {
      type: String,
    },
    modules: [
      {
        type: String,
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: String,
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before save
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare Password
schema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Get JWT Token
schema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generate Reset Token
schema.methods.getResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 50 * 60 * 1000;
  return resetToken;
};

export const Admin = mongoose.model("Admin", schema);
