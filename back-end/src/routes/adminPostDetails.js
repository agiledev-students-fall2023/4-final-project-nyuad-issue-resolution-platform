import express from "express";
import { adminPostHandler } from "../controllers/adminPostHandler.js";

const router = express.Router();

router.post("/:paramName", adminPostHandler);

export default router;
