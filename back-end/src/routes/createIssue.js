import express from "express";
import multer from 'multer';
import { createIssueHandler } from '../controllers/createIssueHandler.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
      }
  });
const upload = multer({ storage: storage });

router.post('/:studentNetID', upload.array('uploadedFiles'), createIssueHandler);

export default router;
