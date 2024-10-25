// import { Admin } from "../models/Admin.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const authorizedAdmin = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.flash("error", "Please authenticate yourself first!");
  return res.redirect("/api/auth/login");
};

// Access module ?
