import express from "express";
import { issueRetrievalHandler } from "../controllers/studentIssuesHandler.js";

const router = express.Router();

router.get("/:paramName", issueRetrievalHandler);

export default router;
