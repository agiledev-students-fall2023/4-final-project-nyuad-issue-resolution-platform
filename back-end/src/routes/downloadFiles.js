import express from "express";
import { downloadFilesHandler } from "../controllers/downLoadFilesHandler.js";

const router = express.Router();
router.get("/:filename", downloadFilesHandler);

export default router;
