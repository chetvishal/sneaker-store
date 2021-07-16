import styles from "./Login.module.css"
import { useAuthContext } from '../../context/authContext';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';

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

    useEffect(() => {
        if(isUserLoggedIn) {
            navigate('/user')
        }
    })

    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.loginFormHeading}>
                    <span className="util-heading-medium">Log in</span>
                    <span className="util-heading-small">You need to be logged in to continue</span>
                    <span className={`util-heading-small ${styles.signUpLink}`}>
                        <Link to="/user" className="nostyle">
                            Sign Up
                        </Link>
                    </span>

                </div>
                <form >
                    <span className={`util-heading-small ${styles.loginInputText}`}>Email</span>
                    <input type="text" className={styles.loginInput} onChange={e => setEmail(e.target.value)} />
                    <span className={`util-heading-small ${styles.loginInputText}`}>Password</span>
                    <input type="password" className={styles.loginInput} onChange={e => setPassword(e.target.value)} />
                    <button
                        className="submit-button"
                        style={{ backgroundColor: "black" }}
                        onClick={handleLogin}
                    >{isUserLoggedIn ? "LOGOUT" : 'LOGIN'}</button>
                </form>
            </div>
        </div>
    )
}