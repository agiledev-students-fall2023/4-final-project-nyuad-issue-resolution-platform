// studentIssueRoutes.js

import express from 'express';
import { studentIssueUpdateHandler } from '../controllers/studentIssueUpdateHandler.js';

const router = express.Router();

// New POST route for updating issues
router.post('/:studentNetID/:paramName', studentIssueUpdateHandler);

export default router;
