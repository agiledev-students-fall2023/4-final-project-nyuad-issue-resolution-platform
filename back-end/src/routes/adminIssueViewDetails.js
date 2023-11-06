import express from "express";
import { adminIssueViewDetailsHandler } from "../controllers/adminIssueViewDetailsHandler.js";

const router = express.Router();

router.get("/:paramName", adminIssueViewDetailsHandler);

export default router;
