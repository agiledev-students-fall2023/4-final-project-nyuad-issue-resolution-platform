import mongoose from "mongoose";
// import IssueModel from '../models/issueModel.js';
// import axios from 'axios';

const connectionString = process.env.MONGODB_URI;
console.log(process.env.MONGODB_URI);
console.log(process.env.BACKEND_URL);
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("Connection error", err.message);
  });

const db = mongoose.connection;

// async function saveMockData() {
//   try {
//     const response = await axios.get(`${process.env.BACKEND_URL}/json/mockapi.json`);
//     const mockData = response.data;

//     for (const data of mockData) {
//       const issue = new IssueModel(data);
//       console.log(issue);
//       await issue.save();
//     }
//     console.log('Data saved successfully!');
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     db.close();
//   }
// }

// saveMockData();

export default db;
