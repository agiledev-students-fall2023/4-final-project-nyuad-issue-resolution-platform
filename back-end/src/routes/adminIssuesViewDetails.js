import express from "express";
import { adminIssuesViewDetailsHandler } from "../controllers/adminIssuesViewDetailsHandler.js";

const router = express.Router();

router.get("/:paramName", adminIssuesViewDetailsHandler);

export default router;
