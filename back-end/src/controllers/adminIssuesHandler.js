import axios from "axios";

export async function issueRetrievalHandler(req, res) {
    const { paramName } = req.params;

    try {
        const response = await axios.get(
            `${process.env.BACKEND_URL}/json/mockapi.json`
        );

        const filteredData = response.data.filter((item) => item.departments.includes(paramName));

        res.json(filteredData);
    } catch (error) {
        console.error("Error retrieving data:", error.message);
        res.status(500).send("An error occurred while retrieving the data.");
    }
}
