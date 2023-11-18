import axios from "axios";
// import the issueDetailsModelSchema

// The function retrieves all the issues related to this departmen
export async function adminIssueViewDetailsHandler(req, res) {
  const { index } = req.params;
  // const { department } = req.params;
  try {
    // const allIssues = await Issue.find({ Issueindex : index});
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
