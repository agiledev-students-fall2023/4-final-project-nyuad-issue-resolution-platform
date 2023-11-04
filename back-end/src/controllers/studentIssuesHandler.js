import axios from "axios";

export async function issueRetrievalHandler(req, res) {
  const { paramName } = req.params;

  try {
    // Assuming the data you want is at the response.data property
    const response = await axios.get(
      `${process.env.BACKEND_URL}/json/contextual_mockapi.json` // will be replaced with db call
    );

    // Assuming response.data is an array of items and each item has a studentNetId field
    const filteredData = response.data.filter(
      (item) => item.studentNetID[0] === paramName
    );

    res.json(filteredData); // Send only the data that matches the studentNetId
  } catch (error) {
    // Log the error and send an appropriate response
    console.error("Error retrieving data:", error.message);
    res.status(500).send("An error occurred while retrieving the data.");
  }
}
