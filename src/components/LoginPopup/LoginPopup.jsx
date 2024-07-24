import React, { useState } from 'react';
import "./LoginPopup.css";
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [currState, setCurrState] = useState("Sign up");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (newPassword.match(strongRegex)) {
            setPasswordStrength("Strong");
        } else if (newPassword.length >= 6) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Weak");
        }
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (currState === "Sign up") {
            if (password !== confirmPassword) {
                setPasswordError("Passwords do not match");
                return;
            }
            setPasswordError("");
        }
        if (email && password && (currState === "Login" || (currState === "Sign up" && confirmPassword))) {
            setShowLogin(false);
        }
    };

    return (
        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={handleSubmit}>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className='login-popup-inputs'>
                    {currState === "Login" ? null : <input type="text" placeholder='Your Name' required />}
                    <input type="email" placeholder="Your email" value={email} onChange={handleEmailChange} required />
                    <input type="password" placeholder="Your password" value={password} onChange={handlePasswordChange} required />
                    <span className={`password-strength ${passwordStrength.toLowerCase()}`}>{passwordStrength}</span>
                    {currState === "Login" ? null : <input type="password" placeholder='Confirm password' value={confirmPassword} onChange={handleConfirmPasswordChange} required />}
                </div>
                <button type="submit">{currState === "Sign up" ? "Create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}
                {currState === "Login" ?
                    <p>Create a new account<span onClick={() => setCurrState("Sign up")}> Click here</span></p> :
                    <p>Already have an account<span onClick={() => setCurrState("Login")}> Login here</span></p>}
            </form>
        </div>
    );
};

export default LoginPopup;
