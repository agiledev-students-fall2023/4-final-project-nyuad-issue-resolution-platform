import axios from "axios";

// The function retrieves all the issues related to this student
export async function studentIssueViewDetailsHandler(req, res) {
  const { paramName } = req.params;
  const { studentNetID } = req.params;

  if (!studentNetID) {
    return res.status(400).send("Missing or invalid studentNetID.");
  }

  if (!paramName) {
    return res.status(400).send("Missing or invalid issue index.");
  }

  try {
    // Assuming the data you want is at the response.data property
    const response = await axios.get(
      `${process.env.BACKEND_URL}/json/mockapi.json` // will be replaced with db call
    );

    // Check if any data is returned for the student
    if (!response.data || response.data.length === 0) {
      return res.status(500).send("No issues found for the given studentNetID.");
    }

    // Assuming response.data is an array of items and each item has a index
    const filteredData = response.data.filter(
      (item) => String(item.index) === String(paramName)
    );

    // Check if the specific issue index exists
    if (filteredData.length === 0) {
      return res.status(500).send("Issue with the given index not found.");
    }

    res.json(filteredData); // Send only the data that matches the specific issue index
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
