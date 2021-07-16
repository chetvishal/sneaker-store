import { useDataContext } from '../../context/cartContextProvider';
import { CartCard } from '../../components/index';
import styles from "./Cart.module.css";
import { ShoppingCart } from '../../assets/index';

export const Cart = () => {

    const { state } = useDataContext();
    const { cart } = state;

    const cartVal = cart.reduce((acc, cur) => {
        console.log("cur price: ", cur._id.price, "cur qty: ", cur.qty)
        return Number(acc) + Number(cur._id.price) * Number(cur.qty)
    }, 0);

    return (
        <div className={styles.cartComponent}>
            <span className={`util-heading-medium`}>{state.cart.length ?
                <div className={styles.cartHeadingText}>
                    CART
                    <ShoppingCart style={{ width: "2rem", marginLeft: "1rem" }} />
                </div> :
                <div className={styles.cartHeadingText}>
                    CART IS EMPTY
                    <ShoppingCart style={{ width: "2rem", marginLeft: "1rem" }} />
                </div>
            }</span>
            <div className={styles.cart}>
                <div className="cartList">
                    {cart.map(i => {
                        return <CartCard key={i._id} data={i} />
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
                        <button className={styles.orderBtn}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}