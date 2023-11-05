import express from "express";
import { issueRetrievalHandler } from "../controllers/adminIssuesHandler.js";

const router = express.Router();

router.get("/:paramName", issueRetrievalHandler);

export default router;
