import express from "express";
import { adminIssuesHandler } from "../controllers/adminIssuesHandler.js";

const router = express.Router();

router.get("/:paramName", adminIssuesHandler);

export default router;
