import express from "express";
import { createIssueHandler } from '../controllers/createIssueHandler.js';


const router = express.Router();

router.post("/:paraName", createIssueHandler) //controller logic


export default router;