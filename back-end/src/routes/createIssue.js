import { createIssueHandler } from '../controllers/createIssueHandler';
import { express } from 'express';


const express = require('express')

const router = express.Router();

router.post("/:paraName", createIssueHandler) //controller logic


export default router;