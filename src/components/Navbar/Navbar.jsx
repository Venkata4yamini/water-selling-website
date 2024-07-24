import React, { useState } from 'react';
import "./Navbar.css";
import { BsSearch } from "react-icons/bs";
import { FaShoppingBasket } from "react-icons/fa";
import { assets } from "../../assets/assets";
import { Link } from 'react-router-dom';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [cart, setCart] = useState([]); // State to represent the cart's contents

    const isCartEmpty = () => cart.length ===0;

    return (
        <div className='navbar'>
            <Link to="/">
                <img src={assets.logo} alt="Logo" height={20} className="logo" />
            </Link>

            <ul className="navbar-menu">
                <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>

                <a href="#app-download" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile app</a>
                <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us</a>
            </ul>
            <div className="navbar-right">
                <div className="navbar-right-search"> <BsSearch style={{ marginRight: "4px" }} />search</div>

                <div className='navbar-search-icon'>
                    <Link to="/cart">
                        <FaShoppingBasket className="basket" />
                        {!isCartEmpty() && <div className='dot'></div>}
                    </Link>
                </div>
                <div className='signin' onClick={() => setShowLogin(true)}>sign in</div>
            </div>
        </div>
    )
}

export default Navbar;
