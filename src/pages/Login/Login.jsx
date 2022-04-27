import styles from "./Login.module.css"
import { useAuthContext } from '../../context/authContext';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useDataContext } from "../../context/dataContextProvider";

export const Login = () => {

    const { isUserLoggedIn, loginUserWithCredentials, logoutUser } = useAuthContext();
    const [errorText, setErrorText] = useState("");
    const { updateServer } = useDataContext();
    const { state } = useLocation();
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginBtnTxt, setLoginBtnTxt] = useState("Log in")

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isUserLoggedIn) {
            logoutUser()
        } else {
            setLoginBtnTxt("Logging In...")
            await loginUserWithCredentials(username, password)
                .then((resp) => {
                    updateServer('LOGIN', resp)
                    navigate(state?.from ? state.from : '/login')
                }).catch((err) => {
                    setErrorText(err.message)
                })
        }
    }

    const guestLogin = async (e) => {
        e.preventDefault();
        if (isUserLoggedIn) {
            logoutUser()
        } else {
            setLoginBtnTxt("Logging In...")
            await loginUserWithCredentials("Elon", "12345")
                .then((resp) => {
                    updateServer('LOGIN', resp)
                    navigate(state?.from ? state.from : '/login')
                }).catch((err) => {
                    setErrorText(err.message)
                })
        }
    }

    useEffect(() => {
        if (isUserLoggedIn) {
            navigate('/user')
        }
    })

    return (
        <div className={styles.login}>
            <div className={styles.loginForm}>
                <div className={styles.loginFormHeading}>
                    <span className="util-heading-medium">Log In</span>
                    <span className="util-heading-small">You need to be logged in to continue</span>
                    <span className={`util-heading-small ${styles.signUpLink}`}>
                        <Link to="/signup" className="nostyle">
                            Sign Up
                        </Link>
                    </span>

                </div>
                <form >
                    <span className={`util-heading-small ${styles.loginInputText}`}>Username</span>
                    <input
                        type="text"
                        className={styles.loginInput}
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    />
                    <span className={`util-heading-small ${styles.loginInputText}`}>Password</span>
                    <input
                        type="password"
                        className={styles.loginInput}
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <button
                        className="submit-button"
                        style={{ backgroundColor: "black" }}
                        onClick={handleLogin}
                    >{isUserLoggedIn ? "LOGOUT" : loginBtnTxt}</button>
                </form>
                <span
                    className="util-heading-small"
                    style={{ textAlign: "center", cursor: "pointer" }}
                    onClick={(e) => {
                        setUsername("Elon")
                        setPassword("12345")
                        guestLogin(e)
                    }}
                >
                    Login as guest
                </span>
                <span className="util-heading-small" style={{ color: "red", textAlign: "center" }}>{errorText}</span>
            </div>
        </div>
    )
}