import IssueModel from '../../models/issueModel.js';

export async function issueRetrievalHandler(req, res) {
    const { paramName } = req.params;

    try {
        const issues = await IssueModel.find({ "departments": paramName });

        res.json(issues);
    } catch (error) {
        console.error("Error retrieving data:", error.message);
        res.status(500).send("An error occurred while retrieving the data.");
    }
}
