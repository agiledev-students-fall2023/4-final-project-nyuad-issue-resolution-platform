import axios from "axios";
import db from '../../database/db';

// import IssueSchema from IssueSchema

// The function retrieves all the issues related to this department with index
export async function adminIssueViewDetailsHandler(req, res) {
  const { index } = req.params;
  // const { department } = req.params;
  try {
    // Assuming the data you want is at the response.data property
    // const response = IssueSchema.findAll(index : index)
    console.log(db);
    const response = await axios.get(
      `${process.env.BACKEND_URL}/json/mockapi.json` // will be replaced with db call
    );

    // Assuming response.data is an array of items and each item has a index
    const filteredData = response.data.filter(
      (item) => String(item.index) === String(index)
    );

    res.json(filteredData); // Send only the data that matches the specific issue index
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
