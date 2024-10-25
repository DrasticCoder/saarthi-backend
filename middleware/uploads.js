import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "userImage") {
      cb(null, "./public/uploads/user/userImages");
    }
    if (file.fieldname === "uploadImage") {
      cb(null, "./public/uploads/uploadImages");
    }
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        Math.floor(Math.random() * 90000) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage }).fields([
  {
    name: "userImage",
  },
  {
    name: "uploadImage",
  },
]);

export default upload;
