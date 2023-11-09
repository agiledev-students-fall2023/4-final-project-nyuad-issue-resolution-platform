import { publicpath } from "../../app.js";
import { promises as fs } from 'fs';

export async function createIssueHandler(req, res){
    try {
    const requestData = req.body.formData;
    const filePath = publicpath + "/json/mockapi.json";
    const fileContent = await fs.readFile(filePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    jsonData.push(formData);

    await fs.writeFile(filePath, JSON.stringify(jsonData, null, '\t'));


    console.log('File written successfully.');
    res.status(200).json({ message: 'Data written to the file successfully' });
    } catch (error) {
        console.error('Error while writing data to the file:', error);
        res.status(500).json({ error: 'An error occurred while writing data to the file' });
    }

}
