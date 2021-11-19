import { createContext, useContext, useState } from "react";
import axios from 'axios';
import { ROOT_ENDPOINT } from "../api/Api";

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {

    const [isUserLoggedIn, setUserLoggedIn] = useState(JSON.parse(localStorage?.getItem('loggedIn'))?.loggedIn || false);
    const { token, userId, username } = JSON.parse(localStorage?.getItem('loggedIn')) || { token: "", userId: "", username: "" }
    const [userDetails, setUserDetails] = useState({ token, userId, username });

    const loginService = (username, password) => {
        return axios.post(`${ROOT_ENDPOINT}/login`, {
            user: { username, password }
        });
    }

    const toggleLoggedIn = () => {
        return new Promise((resolve, reject) => {
            try {
                setUserLoggedIn((isUserLoggedIn) => !isUserLoggedIn)
                resolve({ success: true })
            } catch (error) {
                reject({ success: false })
            }
        })
    }

    const loginUserWithCredentials = async (username, password) => {
        return new Promise((resolve, reject) => {
            try {
                loginService(username, password)
                    .then(resp => {
                        toggleLoggedIn();
                        setUserDetails({ token: resp.data.accessToken, userId: resp.data.userId, username: resp.data.username })
                        localStorage.setItem("loggedIn", JSON.stringify({ loggedIn: true, token: resp.data.accessToken, userId: resp.data.userId, username: resp.data.username }))
                        resolve({ success: true, token: resp.data.accessToken, userId: resp.data.userId })
                    })
                    .catch((err) => {
                        console.log("resp messsage: ", err.response.data.message)
                        reject({ success: false, message: err.response.data.message })
                    }
                    )
            } catch (error) {
                reject({ success: false, error: error.response.data.message })
            }
        })
    }

    const signupUser = (signupDetails) => {
        return new Promise(async (resolve, reject) => {
            try {
                await axios.post(`${ROOT_ENDPOINT}/signup`, {
                    data: {
                        username: signupDetails.username,
                        password: signupDetails.password,
                        name: signupDetails.name,
                        email: signupDetails.email
                    }
                })
                resolve({ success: true, username: signupDetails.username, password: signupDetails.password })
            } catch (err) {
                console.log("error creating account", err.response.data.message)
                reject({ success: false, message: err.response.data.message })
            }
        })
    }

    const logoutUser = () => {
        toggleLoggedIn()
        localStorage.removeItem('loggedIn')
    }

    return (
        <authContext.Provider value={{ isUserLoggedIn, loginUserWithCredentials, logoutUser, userDetails, setUserDetails, signupUser }}>
            {children}
        </authContext.Provider>
    )

}