import express from "express";
import { registerAdmin, logoutAdmin } from "../../controllers/authController.js";
import passport from "passport";

const router = express.Router();

// REGISTER 
router.route("/register").post(registerAdmin);

// lOGIN
router.route("/login").post(
  passport.authenticate("adminLocal", {
    failureRedirect: "/admin/auth/login",
    failureFlash: true,
    successFlash: `Welcome To my Admin Dashboard`,
  }),
  (req, res) => {
    res.redirect("/admin");
  }
);

// LOGOUT
router.route("/logout").get(logoutAdmin);

export default router;
