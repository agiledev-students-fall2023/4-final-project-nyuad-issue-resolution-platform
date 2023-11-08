import { publicpath } from "../../app.js";
import { promises as fs } from 'fs';

export async function adminPostHandler(req, res) {
  const issueindex = req.body.issueindex;
  const newcomment = req.body.commentbox;
  const currentStatus = req.body.issueStatus;
  const currentPriority = req.body.issuePriority;
  const departmentTags = req.body.issueDepartmentTags;
  const filePath = publicpath + "/json/mockapi.json";
  const fileContent = await fs.readFile(filePath, 'utf8');

  const jsonData = JSON.parse(fileContent);

  const specificIssue = jsonData.filter(
    (item) => String(item.index) === String(issueindex)
  );

  if (newcomment !== undefined) {
    specificIssue[0].comments.unshift(newcomment);
  }
  if (currentStatus !== undefined) {
    specificIssue[0].currentStatus = currentStatus;
  }
  if (currentPriority !== undefined) {
    specificIssue[0].currentPriority = currentPriority;
  }
  if (departmentTags !== undefined && departmentTags.length !== 0) {
    specificIssue[0].departments = departmentTags;
  }

  jsonData.filter(
    (item) => String(item.index) === String(issueindex)
  )[0] = specificIssue;

  fs.writeFile(filePath, JSON.stringify(jsonData, null, '\t'), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('File written successfully.');
    }
  });
}
