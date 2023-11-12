
import { publicpath } from "../../app.js";
import { promises as fs } from 'fs';

export async function createIssueHandler(req, res) {
    const { studentNetID } = req.params;

    try {
        const filePath = publicpath + '/json/mockapi.json';

        // Assuming all the needed body parameters are provided correctly from the client side.
        console.log(req.body); 
        const {
            issueTitle,
            issueDesc,
            dateCreated, // Assuming this is sent from the client or generated here.
            timeCreated, // Assuming this is sent from the client or generated here.
            currentStatus, // This should have a default status if not provided by the client.
            currentPriority // This should have a default priority if not provided by the client.
          } = req.body;

        // Additional checks and processing can be performed here for attachments and departments.
        // For example, here's how you might process an array of department tags received in the request.
        // The actual implementation will depend on the format of departments in req.body.
        const processedDepartments = req.body.deptTagged || []; // Add your processing logic here
        const processedAttachments = req.body.uploadedFiles ? req.body.uploadedFiles.split(';') : []; // Add your processing logic here

        // Read the existing JSON file
        const fileContent = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(fileContent);

        const issueDateCreated = dateCreated || new Date().toLocaleDateString();
        const issueTimeCreated = timeCreated || new Date().toLocaleTimeString();

        const newIssue = {
            index: jsonData.length + 1,
            studentNetID: req.body.studentNetID,
            studentName: req.body.studentName, // Now taking directly from req.body with validation
            title: issueTitle,
            description: issueDesc,
            attachments: processedAttachments,
            departments: processedDepartments,
            dateCreated: issueDateCreated,
            timeCreated: issueTimeCreated,
            currentStatus: currentStatus || 'New',
            currentPriority: currentPriority || 'Normal',
        }; 

        jsonData.push(newIssue);

        // Write the updated JSON data back to the file
        await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2)); // Corrected to use async/await

        console.log('Issue created successfully and JSON file updated.');
        res.status(200).send('Issue created successfully');
    } catch (error) {
        // Handle errors
        console.error('Error creating issue:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
