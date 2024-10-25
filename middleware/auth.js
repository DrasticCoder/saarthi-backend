import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Admin } from "../models/Admin.js";

// Local strategies for Admin
passport.use(
  "adminLocal",
  new localStrategy(async function (username, password, next) {
    try {
      const admin = await Admin.findOne({ email: username }).select(
        "+password"
      );
      if (!admin)
        return next(null, false, { message: "Email is not registered" });

      let isMatch = await admin.comparePassword(password);
      if (isMatch) {
        return next(null, admin);
      } else {
        return next(null, false, {
          message: "Incorrect credentials, Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  })
);

//Serializing & DeSerializing for browser session
passport.serializeUser(function (user, next) {
  let key = {
    _id: user._id,
    type: user.type,
  };
  next(null, key);
});

passport.deserializeUser(async function (key, next) {
  try {
    let user = await Admin.findOne({ _id: key._id });
    next(null, user);
  } catch (error) {
    next(error, false);
  }
});