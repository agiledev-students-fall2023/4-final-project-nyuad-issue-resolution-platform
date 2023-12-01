import express from "express";
import { issueRetrievalHandler } from "../controllers/adminIssuesHandler.js";
import { adminIssueViewDetailsHandler } from "../controllers/adminIssueViewDetailsHandler.js";

const router = express.Router();

router.get("/:paramName", issueRetrievalHandler);
router.get("/:department/:paramName", adminIssueViewDetailsHandler);

export default router;
