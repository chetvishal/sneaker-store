import React from 'react';
import './card.css';
import { useDataContext } from '../../context/cartContextProvider';

export const CartCard = ({data}) => {

    const { updateServer } = useDataContext();
    
    const {_id} = data;
    console.log("from cartCart: ",_id);

    return (
        <div className="cart-card">
            <div className="cart-image">
                <img src={data._id.image} alt="" />
                <div>
                    <button
                        onClick={() => {
                            updateServer('INCREASE_CART_QTY', {_id: data._id._id, qty: data.qty})
                            // dispatch({type: 'INCREASE_CART_QTY', payload: {id: data.id }})
                        }}
                        className="cart-qty-btn"
                    >+</button>
                    <span className="cart-qty"> {data.qty} </span>
                    <button
                        onClick={() => {
                            data.qty === 1 ?
                                updateServer('REMOVE_FROM_CART', {_id: data._id._id}) 
                                // dispatch({type: 'REMOVE_FROM_CART', payload: { id: data.id }})
                                :
                                updateServer('DECREASE_CART_QTY', {_id: data._id._id, qty: data.qty})
                                // dispatch({type: 'DECREASE_CART_QTY', payload: { id: data.id }})
                        }}
                        className="cart-qty-btn"
                    >-</button>
                </div>
            </div>
            <div className="cart-details">
                <span className="cart-item-title">{data._id.name}</span>
                <p>
                    <span style={{ fontWeight: "bold" }}>₹{data._id.price} </span>
                    <span className="util-gray-text" style={{ fontSize: "1rem" }}> {data._id.offer}</span>
                    <span style={{ display: "block" }}>{data._id.fastDelivery ? "Fast Delivery" : "Fast Delivery not Available"}</span>
                    <span style={{ display: "block", color: data._id.inStock ? 'green' : 'red', fontWeight: "bolder" }}>{data._id.inStock ? "In Stock" : "Out of stock"}</span>
                </p>
            </div>
        </div>
    )
}