import { createContext, useContext, useState, useEffect } from "react";
import { fakeAuthApi } from "../api/fakeAuthApi";

const authContext = createContext();
export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        try {
            const loggedIn = JSON.parse(localStorage?.getItem('loggedIn'));
            console.log("local data: ", loggedIn);
            loggedIn?.loggedIn ? setUserLoggedIn(true) : setUserLoggedIn(false);
        } catch (err) {
            console.log("failed fetching local data: ", err)
        }
    }, [])

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

    const loginUserWithCredentials = (username, password) => {
        return new Promise((resolve, reject) => {
            try {
                fakeAuthApi(username, password)
                    .then(() => {
                        toggleLoggedIn();
                        localStorage.setItem("loggedIn", JSON.stringify({ loggedIn: true }))
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