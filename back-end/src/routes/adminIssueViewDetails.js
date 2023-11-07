import express from "express";
import { adminIssueViewDetailsHandler } from "../controllers/adminIssueViewDetailsHandler.js";
import { adminPostHandler } from "../controllers/adminPostHandler.js";

const router = express.Router();

router.get("/:department/:paramName", adminIssueViewDetailsHandler);

router.post("/:paramName", adminPostHandler);

export default router;
