import React from 'react';
import styles from './cartCard.module.css';
import { useDataContext } from '../../../context/cartContextProvider';

export const CartCard = ({data}) => {

    const { updateServer } = useDataContext();
    
    const {_id} = data;
    console.log("from cartCart: ",_id);

    return (
        <div className={styles.cartCard}>
            <div className={styles.cartCardImageContainer}>
                <img src={data._id.image} className={styles.cartCardImage} alt="" />
                <div>
                    <button
                        onClick={() => {
                            updateServer('INCREASE_CART_QTY', {_id: data._id._id, qty: data.qty})
                        }}
                        className={styles.cartQtyBtn}
                    >+</button>
                    <span className={styles.cartQty}> {data.qty} </span>
                    <button
                        onClick={() => {
                            data.qty === 1 ?
                                updateServer('REMOVE_FROM_CART', {_id: data._id._id}) 
                                :
                                updateServer('DECREASE_CART_QTY', {_id: data._id._id, qty: data.qty})
                        }}
                        className={styles.cartQtyBtn}
                    >-</button>
                </div>
            </div>
            <div className={styles.cartDetails}>
                <span className={styles.cartItemTitle}>{data._id.name}</span>
                <p className={styles.cartDetailsText}>
                    <span className={styles.cartCardPrice}>₹{data._id.price} </span>
                    <span className={`util-gray-text ${styles.cartCardOffer}`}> {data._id.offer}</span>
                    <span className={styles.cartCardDeliveryOption}>{data._id.fastDelivery ? "Fast Delivery" : "Fast Delivery not Available"}</span>
                    <span className={styles.cartCardInStock} style={{ color: data._id.inStock ? 'green' : 'red' }}>{data._id.inStock ? "In Stock" : "Out of stock"}</span>
                </p>
            </div>
        </div>
    )
}