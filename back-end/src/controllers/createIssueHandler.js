import { publicpath } from "../../app.js";
import Issue from '../../models/issueModel.js';
import { promises as fs } from 'fs';

export async function createIssueHandler(req, res) {
    console.log(req.body);
    const {
        dateCreated, 
        currentStatus, 
        currentPriority
    } = req.body;

    const issueDateCreated = dateCreated || new Date().toLocaleDateString();
    const issueTimeCreated = new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false 
    });
    const attachments = req.files.map(file => file.filename);
    const lastIssue = await Issue.findOne().sort({  index: -1  });
    const newIndex = lastIssue ? lastIssue.index + 1 : 1;

    const newIssue = new Issue ({
        index: newIndex,
        studentNetID: [req.params.studentNetID],
        studentName: [req.body.studentName],
        title: req.body.issueTitle,
        description: req.body.issueDesc,
        attachments: attachments,
        departments: req.body.deptTagged.includes(',') ? req.body.deptTagged.split(',') : [req.body.deptTagged],
        comments: [],
        dateCreated: issueDateCreated,
        timeCreated: issueTimeCreated,
        currentStatus:'Open',
        currentPriority: 'New'
    });

    try {
        await newIssue.save();
        console.log('Issue:', newIssue);
        res.status(200).send('Issue created successfully');
    } catch (error) {
        console.error('Error creating issue:', error);
        // res.status(500).json({ error: 'Internal Server Error' });
    }
}
