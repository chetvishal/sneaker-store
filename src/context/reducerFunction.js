export const reducerFunction = (state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCTS_FROM_SERVER':
            return { ...state, products: action.payload };
        case 'ADD_CART_FROM_SERVER':
            return { ...state, cart: action.payload };
        case 'ADD_WISHLIST_FROM_SERVER':
            return { ...state, wishList: action.payload };
        case "SORT":
            return { ...state, sort: action.payload };
        case "TOGGLE_INVENTORY":
            return { ...state, showInventoryAll: !state.showInventoryAll };
        case "TOGGLE_DELIVERY":
            return { ...state, showFastDelivery: !state.showFastDelivery };
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, { ...action.payload, qty: 1 }],
                // products: state.products.map(i => i.id === action.payload.id ? { ...i, inCart: true } : i),
                // wishList: state.wishList.map(i => i.id === action.payload.id ? { ...i, inCart: true } : i)
            }
        case 'INCREASE_CART_QTY':
            return {
                ...state,
                cart: state.cart.map(i => i._id._id === action.payload._id ? { ...i, qty: i.qty + 1  } : i)
            }
        case 'DECREASE_CART_QTY':
            return {
                ...state,
                cart: state.cart.map(i => i._id._id === action.payload._id ? { ...i, qty: i.qty - 1 } : i)
            }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(i => i._id._id !== action.payload._id),
                // products: state.products.map(i => i.id === action.payload.id ? { ...i, inCart: false } : i),
                // wishList: state.wishList.map(i => i.id === action.payload.id ? { ...i, inCart: false } : i)
            }
        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishList: [...state.wishList, { ...action.payload }],
                // wishList: [...state.wishList, { ...action.payload, inWishList: true }],
                // products: state.products.map(i => i.id === action.payload.id ? { ...i, inWishList: true } : i)
            }
        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishList: state.wishList.filter(i => i._id._id !== action.payload._id),
                // products: state.products.map(i => i.id === action.payload.id ? { ...i, inWishList: false } : i)
            }
        case 'SET_ROUTE':
            return { ...state, route: action.payload }
        case 'SET_TOAST': 
            return {...state, toast: {visible: action.payload.visible, text: action.payload.text}}
        default:
            return state;
    }
}