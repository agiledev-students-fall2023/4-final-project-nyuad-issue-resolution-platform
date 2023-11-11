import express from "express";
import { createIssueHandler } from '../controllers/createIssueHandler.js';


const router = express.Router();

//router.get('/:studentNetID', createIssueHandler);

router.post('/:studentNetID', createIssueHandler);


export default router;