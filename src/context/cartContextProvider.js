import { createContext, useContext, useReducer, useEffect } from 'react';
import { reducerFunction } from '../reducers/reducerFunction';
import axios from 'axios';

const dataContext = createContext();

export const useDataContext = () => useContext(dataContext);

export const CartContextProvider = ({ children }) => {
    useEffect(() => {
        async function getData() {

            await axios.get('https://stark-sierra-40682.herokuapp.com/products').then((resp) => {
                // console.log('from context', resp)
                dispatch({ type: 'ADD_PRODUCTS_FROM_SERVER', payload: resp.data.products });
            }).catch(err => alert('failed to fetch data from server: ', err));

            await axios.get('https://stark-sierra-40682.herokuapp.com/cart').then((resp) => {
                // console.log("from cart context",resp.data.cart)
                dispatch({ type: 'ADD_CART_FROM_SERVER', payload: resp.data.cart });
            }).catch(err => console.log(err));

            await axios.get('https://stark-sierra-40682.herokuapp.com/wishlist').then((resp) => {
                // console.log("from wishlist context",resp.data.wishlist)
                dispatch({ type: 'ADD_WISHLIST_FROM_SERVER', payload: resp.data.wishlist });
            }).catch(err => alert('failed to fetch data from server: (cartList)', err));

        }
        getData();
    }, []);

    const removeToast = () => {
        setTimeout(() => {
            dispatch({ type: 'SET_TOAST', payload: { visible: false, text: "" } })
        }, 3000)
    }

    const updateServer = async (action, payload) => {
        switch (action) {
            case 'ADD_TO_CART': {
                await axios.post('https://stark-sierra-40682.herokuapp.com/cart', {
                    ...payload,
                    qty: 1
                }).then(response => {
                    if (response.status === 201) {
                        console.log("from add to cart: ", response.data.data)
                        dispatch({ type: 'ADD_TO_CART', payload: response.data.item })
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
                await axios.delete(`https://stark-sierra-40682.herokuapp.com/cart`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: payload
                }).then(response => {
                    if (response.status === 201) {
                        dispatch({ type: 'REMOVE_FROM_CART', payload: response.data.item });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully Removed from cart" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(error => console.log('error removing from wishlist: ', error));
                break;
            }
            case 'ADD_TO_WISHLIST': {
                await axios.post('https://stark-sierra-40682.herokuapp.com/wishlist', {
                    ...payload
                }).then(response => {
                    if (response.status === 201) {
                        dispatch({ type: 'ADD_TO_WISHLIST', payload: response.data.item })
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
                await axios.delete('https://stark-sierra-40682.herokuapp.com/wishlist', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: payload
                }).then(response => {
                    if (response.status === 201) {
                        console.log("from REMOVE_FROM_WISHLIST: ", response.data["_id"])
                        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: response.data.item });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully Removed from Wishlist" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(error => console.log('error removing from wishlist: ', error));
                break;
            }
            case 'INCREASE_CART_QTY': {
                await axios.patch(`https://stark-sierra-40682.herokuapp.com/cart`, {
                    ...payload,
                    qty: payload.qty + 1
                }).then(response => {
                    if (response.status === 201) {
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
                await axios.patch(`https://stark-sierra-40682.herokuapp.com/cart`, {
                    ...payload,
                    qty: payload.qty - 1
                }).then(response => {
                    if (response.status === 201) {
                        // console.log("response for decreasing cart quantity: ", response)
                        dispatch({ type: 'DECREASE_CART_QTY', payload: response.data.item });
                        dispatch({ type: 'SET_TOAST', payload: { visible: true, text: "Successfully decreased quantity" } })
                        removeToast();
                    } else {
                        throw Error
                    }
                }).catch(err => console.log(err))
                break;
            }
            case 'FETCH_TO_CART': {
                await axios.get('/api/wishLists').then((resp) => {
                    console.log('response from context', resp)
                }).catch(err => console.log('error from context'))
                break;
            }
            default: return null;
        }
    }

    const [state, dispatch] = useReducer(reducerFunction, {
        products: [],
        sort: null,
        showInventoryAll: false,
        showFastDelivery: false,
        cart: [],
        wishList: [],
        toast: { visible: false, text: "test" }
    });

    return (
        <dataContext.Provider value={{ state, dispatch, updateServer }}>
            {children}
        </dataContext.Provider>
    )
}

