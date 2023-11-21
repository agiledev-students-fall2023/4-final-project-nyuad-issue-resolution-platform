import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext'; // Import AuthContext
import './LoginPage.css';
import logo from '../../assets/images/nyu-logo.png';
import LoginPageNavbar from '../../components/general/LoginPageNavbar/LoginPageNavbar';

const LoginPage = () => {
  const [userType, setUserType] = useState('student');
  const { setIsAuthenticated } = useContext(AuthContext); // Use useContext to access AuthContext
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const urlEncodedData = new URLSearchParams(formData);
    let auth = false;

    try {
      const response = await axios.post(
        `${BASE_URL}/api/login/${userType}`,
        urlEncodedData,
        { withCredentials: true }
      );
      auth = response.data.authenticated;

      if (auth) {
        setIsAuthenticated(true); // Update the authentication state
        localStorage.setItem('isAuthenticated', 'true');
        if (userType === 'student') {
          navigate('/student/dashboard');
        } else if (userType === 'admin') {
          navigate('/admin/dashboard');
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      if (error.response) {
        const errorData = error.response.data;
        console.error('Error data from server:', errorData);
      }
      setIsAuthenticated(false);
      localStorage.setItem('isAuthenticated', 'false');
    }
  };

  return (
    <div className="login-page">
      <LoginPageNavbar />
      <section className="login-box">
        <div className="toggle-container">
          <button
            className={userType === 'student' ? 'active' : ''}
            onClick={() => setUserType('student')}
          >
            Student
          </button>
          <button
            className={userType === 'admin' ? 'active' : ''}
            onClick={() => setUserType('admin')}
          >
            Admin
          </button>
        </div>
        <img src={logo} alt="Logo" className="logo" />
        <h3>Log In to Your NYU Account</h3>
        <form className="login-form" onSubmit={handleFormSubmit}>
          {/* Form fields */}
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
              abide by the{' '}
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
