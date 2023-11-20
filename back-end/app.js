// IMPORTS
import "./env-config.js"; // to ensure that the environment variables are loaded before everything else
import express from "express"; // ESM import style!
import morgan from "morgan";
import cors from "cors";
import url from "url";
import path from "path";
import login from "./src/routes/login.js";
import studentIssues from "./src/routes/studentIssues.js";
import studentIssueViewDetails from "./src/routes/studentIssueViewDetails.js";
import studentIssueUpdate from "./src/routes/studentIssueUpdate.js";
import adminIssues from "./src/routes/adminIssues.js";
import adminIssueViewDetails from "./src/routes/adminIssueViewDetails.js";
import adminPostDetails from "./src/routes/adminPostDetails.js";
import createIssue from "./src/routes/createIssue.js";
/* eslint-disable no-unused-vars */
import db from "./database/db.js";
/* eslint-enable no-unused-vars */
import passport from "./config/passportConfig.js";
import checkJWT from "./src/middlewares/checkJWT.js";
import cookieParser from "cookie-parser";

// import multer from "multer"; - configure when required

const app = express(); // instantiate an Express object

// MIDDLEWARES

// enable CORS - to allow requests from React frontend to reach the Express backend
const corsOptions = {
  origin: process.env.FRONTEND_URL, // The exact origin of frontend is required for credentials
  credentials: true // This allows the server to accept cookies from the client
};
app.use(cors(corsOptions));

// Later during deployment:
// const corsOptions = {
//     origin: 'http://localhost:3000', // allow only the React frontend to connect
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // allow session cookie from browser to pass through
//     optionsSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

// serve static files from the public folders
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const publicpath = path.join(__dirname, "public");
app.use(express.static(path.join(__dirname, "public")));

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

// protected routes setup
app.use(checkJWT);

// ROUTE HANDLERS

// login
app.use("/api/login", login);

// Student Side Issue Retrieval
app.use("/api/issues/student", studentIssues);

// Student Side Issue View Details
// app.use("/api/issues/student/", studentIssueViewDetails);

// Student Side Issue Update
app.use("/api/actions/student", studentIssueUpdate);

// Admin side issue retrieval
app.use("/api/issues/admin", adminIssues);

app.use("/api/issues/admin/", adminIssueViewDetails);

app.use("/api/actions/admin/", adminPostDetails);

app.use("/api/actions/student", createIssue);

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
