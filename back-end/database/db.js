import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URI;

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
