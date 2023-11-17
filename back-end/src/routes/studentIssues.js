import express from "express";
import { issueRetrievalHandler } from "../controllers/studentIssuesHandler.js";
import { studentIssueViewDetailsHandler } from "../controllers/studentIssueViewDetailsHandler.js";

const router = express.Router();

router.get("/:paramName", issueRetrievalHandler);
router.get("/:studentNetID/:paramName", studentIssueViewDetailsHandler);

export default router;
