import "./Login.css"
import { useAuthContext } from '../../context/authContext';
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';

export const Login = () => {

    const { isUserLoggedIn, loginUserWithCredentials, logoutUser } = useAuthContext();
    const { state } = useLocation();
    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = e => {
        e.preventDefault();
        console.log("email: ", email, 'password', password)
        if (isUserLoggedIn) {
            logoutUser()
        } else
            loginUserWithCredentials(email, password).then(() => navigate(state?.from ? state.from : '/login'))
    }


    return (
        <div className="login">
            <div className="login-form">
                <div className="login-form-heading">
                    <span className="util-heading-medium">Log in</span>
                    <span className="util-heading-small">You need to be logged in to continue</span>
                    <span className="util-heading-small sign-up-link">Sign Up</span>

                </div>
                <form >
                    <span className="util-heading-small login-input-text">Email</span>
                    <input type="text" className="login-input" onChange={e => setEmail(e.target.value)} />
                    <span className="util-heading-small login-input-text">Password</span>
                    <input type="password" className="login-input" onChange={e => setPassword(e.target.value)} />
                    <button
                        className="order-btn"
                        style={{ backgroundColor: "black" }}
                        onClick={handleLogin}
                    >{isUserLoggedIn ? "LOGOUT" : 'LOGIN'}</button>
                </form>
            </div>
        </div>
    )
}