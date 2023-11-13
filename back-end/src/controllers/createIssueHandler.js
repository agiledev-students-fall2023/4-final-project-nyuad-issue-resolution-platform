import { publicpath } from "../../app.js";
import { promises as fs } from 'fs';

export async function createIssueHandler(req, res) {
    const { studentNetID, studentName } = req.params;

    try {
        const filePath = publicpath + '/json/mockapi.json';

        // Assuming all the needed body parameters are provided correctly from the client side.
        console.log(req.body); 
        const {
            dateCreated, // Assuming this is sent from the client or generated here.
            timeCreated, // Assuming this is sent from the client or generated here.
            currentStatus, // This should have a default status if not provided by the client.
            currentPriority, // This should have a default priority if not provided by the client.
            comments
          } = req.body;

        let attachments = req.files ? req.files.map(file => file.filename) : [null]; // Map uploaded files to an array of filenames

        // Read the existing JSON file
        const fileContent = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        const issueDateCreated = dateCreated || new Date().toLocaleDateString();
        const issueTimeCreated = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: undefined, // Explicitly prevent seconds from showing
            hour12: false // Use 24-hour format, change to true for 12-hour format if preferred
          });
        const newcomments = ' ';

        const newIssue = {
            index: jsonData.length + 1,
            studentNetID: [req.params.studentNetID],
            studentName: [req.body.studentName], // Now taking directly from req.body with validation
            title: req.body.issueTitle,
            description: req.body.issueDesc,
            attachments: req.body.uploadedFiles.includes(',') ? req.body.uploadedFiles.split(',') : [req.body.uploadedFiles],
            departments: req.body.deptTagged.includes(',') ? req.body.deptTagged.split(',') : [req.body.deptTagged],
            comments: [newcomments],
            dateCreated: issueDateCreated,
            timeCreated: issueTimeCreated,
            currentStatus: currentStatus || 'Open',
            currentPriority: currentPriority || 'New',
        }; 

        jsonData.push(newIssue);

        // Write the updated JSON data back to the file
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2)); // Corrected to use async/await

        console.log('Issue created successfully and JSON file updated.');
        console.log('Body:', req.body);
        console.log('Params:', req.params);
        res.status(200).send('Issue created successfully');
    } catch (error) {
        // Handle errors
        console.error('Error creating issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
