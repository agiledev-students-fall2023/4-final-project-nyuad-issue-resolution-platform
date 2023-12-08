import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/general/AuthContext/AuthContext'; // Import AuthContext
import './LoginPage.css';
import logo from '../../assets/images/nyu-logo.png';
import LoginPageNavbar from '../../components/general/LoginPageNavbar/LoginPageNavbar';

const LoginPage = () => {
  const [userType, setUserType] = useState('student');
  const { setIsAuthenticated, setUserRole, setUserName, setUserNetID, setUserDept, isAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const [authError, setAuthError] = useState('');
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

  if (isAuthenticated) {
    if (userRole === 'student') {
      navigate('/student/dashboard');
    } else if (userRole === 'admin') {
      navigate('/admin/dashboard');
    }
  }

  const handleFormSubmit = async (event) => {
    setAuthError('');
    event.preventDefault();
    const formData = new FormData(event.target);
    const urlEncodedData = new URLSearchParams(formData);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/login/${userType}`,
        urlEncodedData,
        { withCredentials: true }
      );
      if (response.data.authenticated) {
        setIsAuthenticated(true);
        setUserRole(response.data.userType);
        setUserName(response.data.name);
        setUserNetID(response.data.netId);
        setUserDept(response.data.userDept);
        if (response.data.userType === 'student') {
          navigate('/student/dashboard');
        } else if (response.data.userType === 'admin') {
          navigate('/admin/dashboard');
        }
      } else if (response.data.authenticated === false) {
        setAuthError('The password you entered was incorrect.');
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      if (error.response) {
        const errorData = error.response.data;
        console.error('Error data from server:', errorData);
      }
      setIsAuthenticated(false);
      setUserRole(null);
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
        {authError && (
          <div className="auth-error">
            {authError}
          </div>
        )}
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
