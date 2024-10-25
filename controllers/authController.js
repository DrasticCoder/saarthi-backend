import { catchAsyncError } from "../middleware/catchAsyncErrors.js";
import { Admin } from "../models/Admin.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const registerAdmin = catchAsyncError(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, confirmPassword } =
    req.body;

  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirm password must be same.")
    );
  }
  let admin = await Admin.findOne({ email });
  if (admin) {
    return next(new ErrorHandler("Email already registered.", 400));
  }
  if (phone.length < 10) {
    return next(new ErrorHandler("Please enter valid phone number.", 422));
  }

  const _admin = {
    firstName,
    lastName,
    email,
    phone,
    password,
  };

  admin = await Admin.create(_admin);
  //   req.flash("success", "Registration successful.");
  //   res.redirect("/admin/auth/login");
  res.status(200).json({
    success: true,
    message: "Registered Successfully.",
  });
});

export const logoutAdmin = catchAsyncError(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(new ErrorHandler("Unable to logout, please try again.", 302));
    }
    // req.flash("success", "Logged out successfully.");
    // res.redirect("/api/admin/auth/login");
    res.status(200).json({
        status: "success", 
        message: "Logged out successfully."
    })
  });
});
