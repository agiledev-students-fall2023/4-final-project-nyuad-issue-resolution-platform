import './LoginPageNavbar.css';
import logo from "../../../assets/images/nyuad-logo.png";

const LoginPageNavbar = () => {
    return (
        <header className="header-login">
            <a href='/' className='navbar-nyuad-text'><p>NYU ABU DHABI <span className='seperator'> | </span> ISSUE RESOLUTION</p></a>
            <a href="https://nyuad.nyu.edu/en/" id="nyuad-logo" target="_blank" rel="noopener noreferrer"><img src={logo} alt="logo" /></a>
            <nav>
                <ul className="nav-links">
                    <li><a href="https://students.nyuad.nyu.edu/" target="_blank" rel="noopener noreferrer">STUDENT PORTAL</a></li>
                    <li><a href="https://intranet.nyuad.nyu.edu/" target="_blank" rel="noopener noreferrer">INTRANET</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default LoginPageNavbar;
