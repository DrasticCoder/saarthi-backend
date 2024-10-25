import ErrorHandler from "../utils/ErrorHandler.js";

const ErrorMiddleware = (err, req, res, next) => {
  err.statusCode ||= 500;
  err.message ||= "Internal Server Error";
  const responseType = req.accepts(["html", "json"]);

  console.log("error:", err);

  // Image folder not exists
  if (err.errno === -4058) {
    const message = `Asset folder missing for this file input. please check path: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  //   wrong mongoDB ID
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // ReferenceError
  if (err.name === "ReferenceError") {
    const message = `Reference Error. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Nodemailer credentials error
  if (err.code === "ESOCKET") {
    const message = `Email functionality out of service. Please try after some time.`;
    err = new ErrorHandler(message, 500);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // if (responseType === "html") {
  //   req.flash("error", err.message);
  //   res.redirect("back");
  // } else if (responseType === "json") {
  //   res.status(err.statusCode).json({
  //     success: false,
  //     message: err.message,
  //   });
  // }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorMiddleware;
