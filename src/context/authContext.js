import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {

    // useEffect(() => {
    //     try {
    //         const loggedIn = JSON.parse(localStorage?.getItem('loggedIn'));
    //         console.log("local data: ", loggedIn);
    //         loggedIn?.loggedIn ? setUserLoggedIn(true) : setUserLoggedIn(false);
    //     } catch (err) {
    //         console.log("failed fetching local data: ", err)
    //     }
    // }, [])

    
    const [isUserLoggedIn, setUserLoggedIn] = useState(JSON.parse(localStorage?.getItem('loggedIn'))?.loggedIn || false);

    const loginService = (username, password) => {
        return axios.post("http://localhost:8000/login", {
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
                        console.log("response: ", resp)
                        localStorage.setItem("loggedIn", JSON.stringify({ loggedIn: true, token: resp.data.accessToken, username: resp.data.username }))
                        resolve({ success: true })
                    })
                    .catch(() => reject({ success: false }))
            } catch (error) {
                reject({ success: false })
            }
        })
    }

    const logoutUser = () => {
        toggleLoggedIn()
        localStorage.removeItem('loggedIn')
    }

    return (
        <authContext.Provider value={{ isUserLoggedIn, loginUserWithCredentials, logoutUser }}>
            {children}
        </authContext.Provider>
    )

}