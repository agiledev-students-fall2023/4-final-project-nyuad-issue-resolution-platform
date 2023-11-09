import { publicpath } from "../../app.js";
import { promises as fs } from 'fs';

export async function createIssueHandler(req, res) {
    try {
      const {
        studentNetID: ID,
        studentName: name,
        formData,
        currentPriority,
        dateCreated: date,
        currentStatus,
      } = req.body;
  
      const filePath = publicpath + '/json/mockapi.json';
      const lastIndex = jsonData.length > 0 ? jsonData[jsonData.length - 1].index : 0;
  
      // read the existing JSON file
      const fileContent = await fs.readFile(filePath, 'utf8');
      const jsonData = JSON.parse(fileContent);
  
      jsonData.push({
        index: lastIndex + 1,
        ID,
        name,
        formData,
        currentPriority,
        date,
        currentStatus,
      });
  
      // write the updated JSON back to the file
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2));
  
      console.log('Data written to the file successfully.');
      res.status(200).json({ message: 'Data written to the file successfully' });
    } catch (error) {
      console.error('Error while writing data to the file:', error);
      res.status(500).json({ error: 'An error occurred while writing data to the file' });
    }
  }