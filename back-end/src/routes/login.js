import express from "express";
import {
  loginStudentHandler,
  loginAdminHandler
} from "../controllers/loginHandler.js";

const router = express.Router();

router.post("/student", loginStudentHandler);

router.post("/admin", loginAdminHandler);

export default router;
