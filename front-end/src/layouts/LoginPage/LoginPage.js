import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import logo from "../../assets/images/nyu-logo.png";
import LoginPageNavbar from "../../components/general/LoginPageNavbar/LoginPageNavbar";

const LoginPage = () => {
  // state variable to keep track of the user type
  const [userType, setUserType] = useState("student");
  const BASE_URL = process.env.REACT_APP_BACKEND_URL; // base url for the backend

  // useNavigate hook later to be used to redirect to the student dashboard
  const navigate = useNavigate();

  // handleFormSubmit function to handle form submission
  const handleFormSubmit = async (event) => {
    // preventing reload of the page
    event.preventDefault();

    // creating a new FormData object(key-value pairs representing form fields and values
    const formData = new FormData(event.target);
    const urlEncodedData = new URLSearchParams(formData);
    let auth = false;

    try {
      // making a POST request to the backend
      const response = await axios.post(
        `${BASE_URL}/api/login/${userType}`,
        urlEncodedData,
        {
          withCredentials: true
        }
      );
      // The response data from the server
      auth = response.data.authenticated;
    } catch (error) {
      console.error("Error during form submission:", error);
      // In case of error, if you need to access the response provided by the server (if any)
      if (error.response) {
        const errorData = error.response.data;
        console.error("Error data from server:", errorData);
      }
    }

    if (userType === "student" && auth) {
      // Redirect to the student dashboard
      navigate("/student/dashboard");
    }

    if (userType === "admin" && auth) {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="login-page">
      <LoginPageNavbar />
      {/* <p className="login-header">NYU Abu Dhabi Issue Resolution Portal</p> */}

      <section className="login-box">
        <div className="toggle-container">
          <button
            // setting the button active if the user type is student
            className={userType === "student" ? "active" : ""}
            onClick={() => setUserType("student")}
          >
            Student
          </button>
          <button
            // setting the button active if the user type is admin
            className={userType === "admin" ? "active" : ""}
            onClick={() => setUserType("admin")}
          >
            Admin
          </button>
        </div>
        <img src={logo} alt="Logo" className="logo" />
        <h3>Log In to Your NYU Account</h3>

        {/* Form to take the username and password as input - calls the handleFormSubmit function on form submission */}
        <form className="login-form" onSubmit={handleFormSubmit}>
          <label>
            <strong>NetID </strong>(e.g., aqe123)
            <input type="text" name="username" required />
          </label>
          <label>
            <strong>Password</strong>
            <input type="password" name="password" required />
          </label>
          <em>
            <p>
              By logging in you agree to <br />
              abide by the{" "}
              <a
                href="https://www.nyu.edu/about/policies-guidelines-compliance/policies-and-guidelines/responsible-use-of-nyu-computers-and-data-policy-on.html"
                target="_blank"
                rel="noreferrer"
              >
                Policy on <br />
                Responsible Use of NYU <br />
                Computers and Data.
              </a>
            </p>
          </em>
          <button type="submit" className="login-button">
            <strong>LOG IN</strong>
          </button>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
