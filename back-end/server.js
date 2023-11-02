// import the web server from the ESM module we created earlier
import server from "./app.js";
import dotenv from "dotenv";

dotenv.config({ silent: true });

// the port to listen to for incoming requests
const port = process.env.BACKEND_PORT || 5000;

// call express's listen function to start listening to the port
const listener = server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

// a function to stop listening to the port
const close = () => {
    listener.close();
};

// export the close function
export default close;
