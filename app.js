import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import rfs from "rotating-file-stream";
import MongoStore from "connect-mongo";
import passport from "passport";
import morgan from "morgan";
import expressSanitizer from "express-sanitizer";
import ErrorMiddleware from "./middleware/Error.js";
import "./middleware/auth.js";

config({ path: "./config/config.env" });
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    key: process.env.KEY,
    secret: process.env.SECRET,
    secure: true,
    httpOnly: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 7 * 24 * 60 * 60,
      autoRemove: "native",
      collectionName: "sessions",
      touchAfter: 12 * 3600,
    }),
    cookie: {
      maxAge: 50 * 365 * 24 * 60 * 60 * 1000,
    },
  })
);

// Create a rotating write stream
let accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "logs"),
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(expressSanitizer());
app.use(morgan("combined", { stream: accessLogStream }));

app.use(function (req, res, next) {
  res.locals.currentUser = req.user || null;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// Route Imports
import adminPrimaryRoutes from "./routes/admin/primaryRoute.js";
import adminAuthRoutes from "./routes/admin/authRoute.js";

app.use("/admin/auth", adminAuthRoutes);
app.use("/admin", adminPrimaryRoutes);

app.get("*", (req, res) => {
  // res.render(__dirname + "/views/common/auth/page-not-found");
  console.log(req.path)
  res.status(500).json({
    success: false,
    message: "The resource you are trying to get is not available.",
  });
});

export default app;

app.use(ErrorMiddleware);
