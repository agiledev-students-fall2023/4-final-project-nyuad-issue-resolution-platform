import express from "express";
import multer from "multer";
import { adminPostHandler } from "../controllers/adminPostHandler.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      // Get the current time
      const currentTime = new Date().toISOString().replace(/:/g, "-");
      // Append the current time to the original filename
      cb(null, currentTime + "-" + file.originalname);
    }
  });
const upload = multer({ storage });
router.post("/:paramName", upload.array("uploadedFiles"), adminPostHandler);

export default router;
