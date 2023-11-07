import express from "express";
import { studentIssueViewDetailsHandler } from "../controllers/studentIssueViewDetailsHandler.js";

const router = express.Router();

router.get("/:studentNetID/:paramName", studentIssueViewDetailsHandler);

export default router;