/* eslint-disable */
import React from 'react';
import './LoginPageNavbar.css';
import logo from "../../../assets/images/nyuad-logo.png";


const LoginPageNavbar = () => {
    return (
        <header class="header" id="heading1">
            <a href='/'><p>NYU ABU DHABI <span className='seperator'> | </span> ISSUE RESOLUTION</p></a>
            <a href="https://nyuad.nyu.edu/en/" id="logo"><img src={logo} alt="logo" /></a>
            <nav>
                <ul class="nav_links">
                    <li><a href="https://students.nyuad.nyu.edu/">STUDENT PORTAL</a></li>
                    <li><a href="https://intranet.nyuad.nyu.edu/">INTRANET</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default LoginPageNavbar;
