import express from "express";
import { downLoadFilesHandler } from "../controllers/downloadfilesHandler.js";

const router = express.Router();

router.get("/:filename", downLoadFilesHandler);

export default router;
