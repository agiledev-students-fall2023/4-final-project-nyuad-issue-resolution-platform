// IMPORTS
import "./env-config.js"; // to ensure that the environment variables are loaded before everything else
import express from "express"; // ESM import style!
import morgan from "morgan";
import cors from "cors";
import url from "url";
import path from "path";
import login from "./src/routes/login.js";
import studentIssues from "./src/routes/studentIssues.js";
import studentIssueUpdate from "./src/routes/studentIssueUpdate.js";
import adminIssues from "./src/routes/adminIssues.js";
import adminPostDetails from "./src/routes/adminPostDetails.js";
import createIssue from "./src/routes/createIssue.js";
/* eslint-disable no-unused-vars */
import db from "./database/db.js";
/* eslint-enable no-unused-vars */
import passport from "./config/passportConfig.js";
import checkJWT from "./src/middlewares/checkJWT.js";
import cookieParser from "cookie-parser";
import checkReferer from "./src/middlewares/checkReferer.js";
import updatePriorityForOpenIssues from "./src/middlewares/updatePriorityForOpenIssues.js";
import updateResolved from "./src/middlewares/updateResolved.js";
import downloadFiles from "./src/routes/downloadFiles.js";

const app = express(); // instantiate an Express object

// MIDDLEWARES

// enable CORS - to allow requests from React frontend to reach the Express backend
const corsOptions = {
  origin: process.env.FRONTEND_URL, // The exact origin of frontend is required for credentials
  credentials: true // This allows the server to accept cookies from the client
};
app.use(cors(corsOptions));

// serve static files from the public folders
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const backendpath = path.join(__dirname);
app.use(express.static(path.join(__dirname, "public")));

app.use(checkReferer);

// parse JSON in the request body
app.use(express.json());

// parse urlencoded data in the request body
app.use(express.urlencoded({ extended: true }));

// log HTTP requests
app.use(morgan("dev"));

// parse cookies in the HTTP requests
app.use(cookieParser());

// initialize passport
app.use(passport.initialize());

// an interval to run updatePriorityForOpenIssues every hour
setInterval(() => {
  try {
    updatePriorityForOpenIssues();
  } catch (error) {
    console.error("Error in scheduled updatePriorityForOpenIssues:", error);
  }
}, 30 * 60 * 1000);

// an interval to run updateResolved every hour
setInterval(() => {
  try {
    updateResolved();
  } catch (error) {
    console.error("Error in scheduled updateResolved:", error);
  }
}, 30 * 60 * 1000);

// Logout endpoint to remove token from cookie
app.get("/api/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 }); // Clear the cookie
  res.json({ message: "Logged out successfully" });
});

app.get("/api/check-auth", checkJWT, (req, res) => {
  if (req.user) {
    res.status(200).json({ authenticated: true, user: req.user });
  } else {
    // User is not authenticated
    res
      .status(401)
      .json({ authenticated: false, message: "User not authenticated" });
  }
});

// ROUTE HANDLERS

// login
app.use("/api/login", login);

// Student Side Issue Retrieval
app.use("/api/issues/student", studentIssues);

// Student Side Issue Update
app.use("/api/actions/student", studentIssueUpdate);

// Admin side issue retrieval
app.use("/api/issues/admin", adminIssues);

app.use("/api/actions/admin/", adminPostDetails);

app.use("/api/actions/student", createIssue);

app.use("/download/", downloadFiles);

// Temporary route to create users
// import User from "./models/UserModel.js";
// app.post("/create-user", async (req, res) => {
//   try {
//     const { name, netId, password, userType, userDept } = req.body;
//     const newUser = new User({ name, netId, password, userType, userDept });
//     await newUser.save();
//     res.status(201).send("User created successfully");
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

export default app;
