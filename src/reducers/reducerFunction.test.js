import { reducerFunction } from './reducerFunction';
import { initialDataState } from '../context/dataContextProvider';

describe("testing the app's reducer function", () => {

    test("should add product to the cart", () => {
        // const initialState = {
        //     score: 5,
        //     quizId: "dfjsa224",
        //     quizName: "The blockchain quiz",
        //     quizQuesQty: 1,
        //     allQuizList: []
        // }
        const action = {
            type: 'ADD_TO_CART',
            payload: {
                _id: {
                    fastDelivery: false,
                    image: "https://image.goat.com/375/attachments/product_template_pictures/images/021/147/976/original/497870_00.png.png",
                    inCart: false,
                    inStock: true,
                    inWishList: false,
                    name: "Air Jordan Light Bone",
                    offer: "22% off",
                    price: "121.00",
                    __v: 0,
                    _id: "607d743d55e8324a144814a7",
                },
                quantity: 1
            }
        }

        const state = reducerFunction(initialDataState, action)
        expect(state).toEqual({
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [
                {
                    _id: {
                        fastDelivery: false,
                        image: "https://image.goat.com/375/attachments/product_template_pictures/images/021/147/976/original/497870_00.png.png",
                        inCart: false,
                        inStock: true,
                        inWishList: false,
                        name: "Air Jordan Light Bone",
                        offer: "22% off",
                        price: "121.00",
                        __v: 0,
                        _id: "607d743d55e8324a144814a7",
                    },
                    quantity: 1
                }
            ],
            wishList: [],
            toast: { visible: false, text: "test" }
        })
    })

    test("should add product quantity in the cart", () => {
        const initialState = {
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [
                {
                    _id: {
                        fastDelivery: false,
                        image: "https://image.goat.com/375/attachments/product_template_pictures/images/021/147/976/original/497870_00.png.png",
                        inCart: false,
                        inStock: true,
                        inWishList: false,
                        name: "Air Jordan Light Bone",
                        offer: "22% off",
                        price: "121.00",
                        __v: 0,
                        _id: "607d743d55e8324a144814a7",
                    },
                    quantity: 1
                }
            ],
            wishList: [],
            toast: { visible: false, text: "test" }
        }
        const action = {
            type: 'INCREASE_CART_QTY',
            payload: {
                _id: "607d743d55e8324a144814a7",
            }
        }

        const state = reducerFunction(initialState, action)
        expect(state).toEqual({
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [
                {
                    _id: {
                        fastDelivery: false,
                        image: "https://image.goat.com/375/attachments/product_template_pictures/images/021/147/976/original/497870_00.png.png",
                        inCart: false,
                        inStock: true,
                        inWishList: false,
                        name: "Air Jordan Light Bone",
                        offer: "22% off",
                        price: "121.00",
                        __v: 0,
                        _id: "607d743d55e8324a144814a7",
                    },
                    quantity: 2
                }
            ],
            wishList: [],
            toast: { visible: false, text: "test" }
        })
    })

    test("should decrease product quantity in the cart", () => {
        const initialState = {
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [
                {
                    _id: {
                        fastDelivery: false,
                        image: "https://image.goat.com/375/attachments/product_template_pictures/images/021/147/976/original/497870_00.png.png",
                        inCart: false,
                        inStock: true,
                        inWishList: false,
                        name: "Air Jordan Light Bone",
                        offer: "22% off",
                        price: "121.00",
                        __v: 0,
                        _id: "607d743d55e8324a144814a7",
                    },
                    quantity: 2
                }
            ],
            wishList: [],
            toast: { visible: false, text: "test" }
        }
        const action = {
            type: 'DECREASE_CART_QTY',
            payload: {
                _id: "607d743d55e8324a144814a7",
            }
        }

        const state = reducerFunction(initialState, action)
        expect(state).toEqual({
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [
                {
                    _id: {
                        fastDelivery: false,
                        image: "https://image.goat.com/375/attachments/product_template_pictures/images/021/147/976/original/497870_00.png.png",
                        inCart: false,
                        inStock: true,
                        inWishList: false,
                        name: "Air Jordan Light Bone",
                        offer: "22% off",
                        price: "121.00",
                        __v: 0,
                        _id: "607d743d55e8324a144814a7",
                    },
                    quantity: 1
                }
            ],
            wishList: [],
            toast: { visible: false, text: "test" }
        })

    })

    test("should remove product from the cart", () => {
        const initialState = {
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [
                {
                    _id: {
                        fastDelivery: false,
                        image: "https://image.goat.com/375/attachments/product_template_pictures/images/021/147/976/original/497870_00.png.png",
                        inCart: false,
                        inStock: true,
                        inWishList: false,
                        name: "Air Jordan Light Bone",
                        offer: "22% off",
                        price: "121.00",
                        __v: 0,
                        _id: "607d743d55e8324a144814a7",
                    },
                    quantity: 2
                }
            ],
            wishList: [],
            toast: { visible: false, text: "test" }
        }
        const action = {
            type: 'REMOVE_FROM_CART',
            payload: {
                _id: "607d743d55e8324a144814a7",
            }
        }

        const state = reducerFunction(initialState, action)
        expect(state).toEqual({
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [],
            wishList: [],
            toast: { visible: false, text: "test" }
        })
    })

    test("should add a product to the wishlist", () => {
        const initialState = {
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [],
            wishList: [],
            toast: { visible: false, text: "test" }
        }
        const action = {
            type: 'ADD_TO_WISHLIST',
            payload: {
                _id: {
                    fastDelivery: false,
                    image: "https://image.goat.com/375/attachments/product_template_pictures/images/020/627/570/original/491891_00.png.png",
                    inStock: true,
                    name: "Nike Neon Seoul",
                    offer: "70% bonanza",
                    price: "17.00",
                    _id: "607d743d55e8324a144814b3",
                },
            }
        }

        const state = reducerFunction(initialState, action)
        expect(state).toEqual({
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [],
            wishList: [
                {
                    _id: {
                        fastDelivery: false,
                        image: "https://image.goat.com/375/attachments/product_template_pictures/images/020/627/570/original/491891_00.png.png",
                        inStock: true,
                        name: "Nike Neon Seoul",
                        offer: "70% bonanza",
                        price: "17.00",
                        _id: "607d743d55e8324a144814b3",
                    }
                }
            ],
            toast: { visible: false, text: "test" }
        })
    })

    test("should remove a product from wishlist", () => {
        const initialState = {
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [],
            wishList: [{
                _id: {
                    fastDelivery: false,
                    image: "https://image.goat.com/375/attachments/product_template_pictures/images/020/627/570/original/491891_00.png.png",
                    inStock: true,
                    name: "Nike Neon Seoul",
                    offer: "70% bonanza",
                    price: "17.00",
                    _id: "607d743d55e8324a144814b3",
                }
            }],
            toast: { visible: false, text: "test" }
        }
        const action = {
            type: 'REMOVE_FROM_WISHLIST',
            payload: {
                _id: "607d743d55e8324a144814b3",
            }
        }

        const state = reducerFunction(initialState, action)
        expect(state).toEqual({
            products: [],
            sort: null,
            showInventoryAll: false,
            showFastDelivery: false,
            cart: [],
            wishList: [],
            toast: { visible: false, text: "test" }
        })
    })
});

