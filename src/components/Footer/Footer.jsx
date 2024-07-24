import React from 'react';
import "./Footer.css";
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer' id="footer">
      <hr />
      <div className='footer-content'>
        <div className='footer-content-left'>
          <img className='logo' src={assets.logo} alt="" />
          <p>Discover AquaFlow: where hydration meets vitality. Dive into a world of pure refreshment, sourced from nature's finest. Join us on a journey of replenishment and renewal. Welcome to AquaFlow, where every drop tells a story of hydration.</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook} alt="" />
            <img src={assets.instagram} alt="" />
            <img src={assets.linkedin} alt="" />
          </div>
        </div>
        <div className='footer-content-center'>
          <h2>COMPANY</h2>
          <ul>
            <Link to="/"><li>Home</li></Link>
            <a href='#explore-menu'><li>Menu</li></a>
            <li>About us</li>
            <a href="#app-download"><li>app download</li></a>
            <Link to="/cart"><li>Delivery</li></Link>
            <li>Private policy</li>
          </ul>
        </div>
        <div className='footer-content-right'>
          <h2>GET IN TOUCH</h2>
          <ul>
            <li><a href="tel:+12124567890">+1-212-456-7890</a></li>
            <li className='footer-email'>
              <p onClick={() => window.location.href = "mailto:contact@AquaFlow.com"}>
                <span>contact@AquaFlow.com</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @Aquaflow.com - All Right Reserved.</p>
    </div>
  );
}

export default Footer;
