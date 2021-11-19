import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducerFunction } from '../reducers/reducerFunction';
import axios from 'axios';
import { useAuthContext } from './authContext';

const dataContext = createContext();

export const useDataContext = () => useContext(dataContext);

export const initialDataState = {
    products: [],
    sort: null,
    showInventoryAll: true,
    showFastDelivery: false,
    cart: [],
    wishList: [],
    toast: { visible: false, text: "test" }
}

export const DataContextProvider = ({ children }) => {

    const { userDetails, setUserDetails } = useAuthContext();

    async function getData(userData = userDetails) {

        await axios.get('https://ecom-sneaker-api.herokuapp.com/products').then((resp) => {
            dispatch({ type: 'ADD_PRODUCTS_FROM_SERVER', payload: resp.data.products });
        }).catch(err => console.log('failed to fetch data from server: ', err));

        if (userData.userId !== "" && userData.token !== "") {
            await axios.get(
                `https://ecom-sneaker-api.herokuapp.com/cart/${userData.userId}`, {
                headers: {
                    'Authorization': userData.token
                }
            }).then((resp) => {
                dispatch({ type: 'ADD_CART_FROM_SERVER', payload: resp.data.cart.products });
            }).catch(err => console.log('failed to fetch data from server: (cartList)', err));

            await axios.get(`https://ecom-sneaker-api.herokuapp.com/wishlist/${userData.userId}`, {
                headers: {
                    'Authorization': userData.token
                }
            }).then((resp) => {
                dispatch({ type: 'ADD_WISHLIST_FROM_SERVER', payload: resp.data.wishlist.products });
            }).catch(err => console.log('failed to fetch data from server: (wishlist)', err));
        }
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const removeToast = () => {
        setTimeout(() => {
            dispatch({ type: 'SET_TOAST', payload: { visible: false, text: "" } })
        }, 3000)
    }

    const updateServer = async (action, payload) => {
        switch (action) {
            case 'ADD_TO_CART': {
                await axios.post('https://ecom-sneaker-api.herokuapp.com/cart', {
                    _id: payload.data._id,
                    quantity: 1,
                    userId: userDetails.userId

                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 201) {
                        dispatch({ type: 'ADD_TO_CART', payload: { _id: payload.data, quantity: 1 } })
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully added to cart" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(error => {
                    console.log("from cart context provider", error)
                })
                break;
            }
            case 'REMOVE_FROM_CART': {
                await axios.delete(`https://ecom-sneaker-api.herokuapp.com/cart`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userDetails.token
                    },
                    data: { ...payload, userId: userDetails.userId }
                }).then(response => {
                    if (response.status === 200) {
                        dispatch({ type: 'REMOVE_FROM_CART', payload });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully Removed from cart" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(error => console.log('error removing from wishlist: ', error));
                break;
            }

            case 'INCREASE_CART_QTY': {
                await axios.patch(`https://ecom-sneaker-api.herokuapp.com/cart`, {
                    ...payload,
                    quantity: payload.quantity + 1,
                    userId: userDetails.userId
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 200) {
                        dispatch({ type: 'INCREASE_CART_QTY', payload: response.data.item });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully increased quantity" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(err => console.log(err))
                break;
            }
            case 'DECREASE_CART_QTY': {
                await axios.patch(`https://ecom-sneaker-api.herokuapp.com/cart`, {
                    ...payload,
                    quantity: payload.quantity - 1,
                    userId: userDetails.userId
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 200) {
                        dispatch({ type: 'DECREASE_CART_QTY', payload: response.data.item });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully decreased quantity" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(err => console.log(err))
                break;
            }
            case 'ADD_TO_WISHLIST': {
                await axios.post(`https://ecom-sneaker-api.herokuapp.com/wishlist`, {
                    _id: payload.data._id,
                    userId: userDetails.userId
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 201) {
                        dispatch({ type: 'ADD_TO_WISHLIST', payload: { _id: payload.data } })
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully Added to Wishlist" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(error => {
                    console.log("from cart context provider", error)
                })
                break;
            }
            case 'REMOVE_FROM_WISHLIST': {
                await axios.delete(`https://ecom-sneaker-api.herokuapp.com/wishlist`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': userDetails.token
                    },
                    data: { ...payload, userId: userDetails.userId }
                }).then(response => {
                    if (response.status === 200) {
                        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: payload });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully Removed from Wishlist" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(error => console.log('error removing from wishlist: ', error));
                break;
            }
            case 'LOGIN': {
                getData({ token: payload.token, userId: payload.userId });
                break;
            }
            case 'LOGOUT': {
                dispatch({ type: "LOGOUT" })
                setUserDetails({ token: "", userId: "" })
                break;
            }
            case 'FETCH_TO_CART': {
                await axios.get('/api/wishLists').then((resp) => {
                    console.log('response from context', resp)
                }).catch(err => console.log('error from context'))
                break;
            }
            case 'CLEAR_CART': {
                await axios.post(`http://localhost:8000/cart/clear`, {
                    userId: userDetails.userId
                }, {
                    headers: {
                        'Authorization': userDetails.token
                    }
                }).then(response => {
                    if (response.status === 200) {
                        console.log("On clear cart")
                        dispatch({ type: 'CLEAR_CART' });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Order Successfull" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(error => console.log('error clearing cart: ', error));
                break;
            }
            default: return null;
        }
    }

    const [state, dispatch] = useReducer(reducerFunction, initialDataState);

    return (
        <dataContext.Provider value={{ state, dispatch, updateServer }}>
            {children}
        </dataContext.Provider>
    )
}

