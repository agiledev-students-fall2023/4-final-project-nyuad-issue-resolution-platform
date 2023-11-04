import axios from "axios";

export async function issueRetrievalHandler(req, res) {
  const { paramName } = req.params;

  if (paramName === "all") {
    try {
      // Assuming the data you want is at the response.data property
      const response = await axios.get(
        `${process.env.BACKEND_URL}/json/contextual_mockapi.json` // will be replaced with db call
      );
      res.json(response.data);
    } catch (error) {
      // Log the error and send an appropriate response
      console.error("Error retrieving issues:", error.message);
      res.status(500);
    }
  }
}
