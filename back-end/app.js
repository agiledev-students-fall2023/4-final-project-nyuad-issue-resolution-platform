// IMPORTS
import express from "express"; // ESM import style!
import morgan from "morgan";
import cors from "cors";
import url from "url";
import path from "path";
import login from "./src/routes/login.js";
import studentIssues from "./src/routes/studentIssues.js";
import studentIssueViewDetails from "./src/routes/studentIssueViewDetails.js";
import adminIssues from "./src/routes/adminIssues.js";
import adminIssueViewDetails from "./src/routes/adminIssueViewDetails.js";

// import multer from "multer"; - configure when required

const app = express(); // instantiate an Express object

// MIDDLEWARES

// enable CORS - to allow requests from React frontend to reach the Express backend
app.use(cors());

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
app.use(express.static(path.join(__dirname, "public")));

// parse JSON in the request body
app.use(express.json());

// parse urlencoded data in the request body
app.use(express.urlencoded({ extended: true }));

// log HTTP requests
app.use(morgan("dev"));

// ROUTE HANDLERS

// login
app.use("/api/login", login);

// Student Side Issue Retrieval
app.use("/api/issues/student", studentIssues);

// Student Side Issue View Details
app.use("/api/issues/student/", studentIssueViewDetails);

// Admin side issue retrieval
app.use("/api/issues/admin", adminIssues);

app.use("/api/issues/admin/", adminIssueViewDetails);

// export the express app we created to make it available to other modules
export default app;
