import express from "express";
import { adminIssueViewDetailsHandler } from "../controllers/adminIssueViewDetailsHandler.js";

const router = express.Router();

router.get("/:department/:paramName", adminIssueViewDetailsHandler);

export default router;
