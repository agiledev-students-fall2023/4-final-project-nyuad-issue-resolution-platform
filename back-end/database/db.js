import mongoose from "mongoose";

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

export default db;
