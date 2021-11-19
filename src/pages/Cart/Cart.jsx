import { useDataContext } from '../../context/dataContextProvider';
import { CartCard } from '../../components/index';
import styles from "./Cart.module.css";
import { ShoppingCart } from '../../assets/index';
import axios from 'axios';
import { API_URL, RAZORPAY_CHECKOUT_URL, RAZORPAY_KEY, RAZORPAY_LOGO } from '../../api/Razorpay';
import { useNavigate } from 'react-router';

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export const Cart = () => {

    const { state, updateServer } = useDataContext();
    const { cart } = state;
    const navigate = useNavigate();

    const cartVal = cart.reduce((acc, cur) => {
        return Number(acc) + Number(cur._id.price) * Number(cur.quantity)
    }, 0);

    const displayRazorpay = async () => {
        const response = await loadScript(`${RAZORPAY_CHECKOUT_URL}`);

        const payment_response = await axios.post(`${API_URL}/payments/razorpay`, {
            amount: cartVal,
        });

        if (!response) {
            alert("Razorpay SDK failed to load!");
            return;
        }

        const { amount, currency, orderId } = payment_response.data;

        const options = {
            key: RAZORPAY_KEY,
            amount: amount,
            currency: currency,
            name: "SNEAKER-STORE",
            description: "Cart transaction",
            image: RAZORPAY_LOGO,
            order_id: orderId,
            handler: async function (response) {
                const paymentVerification = await axios.post(
                    `${API_URL}/payments/verification`,
                    {
                        orderId: orderId,
                        paymentId: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                    }
                );

                if (paymentVerification.data.success) {
                    alert(paymentVerification.data.message);
                    updateServer('CLEAR_CART')
                } else {
                    alert("something went wrong");
                }
            },
            prefill: {
                name: "tester",
                email: "test@gmail.com",
                contact: "9899999999",
            },
            notes: {
                address: "New Delhi",
            },
            theme: {
                color: "#00c1c9",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }




    return (
        <div className={styles.cartComponent}>
            <span className={`util-heading-medium`}>{state.cart.length ?
                <div className={styles.cartHeadingText}>
                    CART
                    <ShoppingCart style={{ width: "2rem", marginLeft: "1rem" }} />
                </div> :
                <div>
                    <div className={styles.cartHeadingText}>
                        CART IS EMPTY
                        <ShoppingCart style={{ width: "2rem", marginLeft: "1rem" }} />
                    </div>
                    <button
                        className="submit-button"
                        style={{ backgroundColor: "black", margin: "0 auto", display: "block", marginTop: "2rem" }}
                        onClick={() => navigate('/')}
                    >START SHOPPING</button>
                </div>
            }</span>
            <div className={styles.cart}>
                <div className="cartList">
                    {cart.map(i => {
                        return <CartCard key={i._id._id} data={i} />
                    })}
                </div>
                <div className={styles.cartDetails} style={{ display: state.cart.length ? 'block' : 'none' }}>
                    <div className={styles.cartDetailCard}>
                        <div className={styles.cartDetailSection}>
                            <span>Total Price ({state.cart.length} items)</span>
                            <span>₹{cartVal}</span>
                        </div>
                        <div className={styles.cartDetailSection}>
                            <span>Delivery Charges</span>
                            <span>₹0.00</span>
                        </div>
                        <hr />
                        <div className={styles.cartDetailSection}>
                            <span>Grand Total</span>
                            <span>₹{cartVal}</span>
                        </div>
                        <button
                            className={styles.orderBtn}

                            onClick={displayRazorpay}
                        >Place Order</button>
                        <span style={{ display: "block", marginTop: "1rem", fontSize: "0.9rem", fontWeight: "bold", color: "#918a8a" }}>Dummy debit card: 4111 1111 1111 1111</span>
                    </div>
                </div>
            </div>
        </div>
    )
}


