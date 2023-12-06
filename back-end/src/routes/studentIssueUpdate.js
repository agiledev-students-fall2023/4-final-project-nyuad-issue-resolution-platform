// studentIssueRoutes.js

import express from 'express';
import multer from "multer";
import { studentIssueUpdateHandler } from '../controllers/studentIssueUpdateHandler.js';

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

// New POST route for updating issues
router.post('/:studentNetID/:paramName', upload.array("uploadedFiles"), studentIssueUpdateHandler);
export default router;
