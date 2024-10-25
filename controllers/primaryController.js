import { catchAsyncError } from "../middleware/catchAsyncErrors.js";

export const dashboard = catchAsyncError(async (req, res, next) => {
  // res.render("admin/dashboard");
  res.render("auth/login");
});
