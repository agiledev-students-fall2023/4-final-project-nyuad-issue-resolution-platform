import express from "express";
import multer from 'multer';
import { createIssueHandler } from '../controllers/createIssueHandler.js';


const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/:studentNetID', upload.array('uploadedFiles'), createIssueHandler);

export default router;