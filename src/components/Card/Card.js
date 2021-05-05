import React from 'react';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../context/cartContextProvider';
import { Link } from 'react-router-dom';
export const Card = (props) => {

    console.log(props)

    const { dispatch, updateServer } = useDataContext();

    return (
        <div class="card-small">
            <div class="card-small-image">
                <img src={props.data.image} alt="" />
                <span class="simple-badge" style={{ display: props.data.inStock ? 'none' : 'false' }}>OUT OF STOCK</span>
                <span class="card-small-dismiss">
                    <FontAwesomeIcon icon={faHeart} style={{ color: props.data.inWishList ? '#ff5656' : '#b8b4b6', padding: "0.3rem", borderRadius: "50%", fontSize: "1rem" }}
                        onClick={() => {
                            props.data.inWishList ?
                                updateServer('REMOVE_FROM_WISHLIST', {_id: props.data._id}) 
                                // dispatch({type: 'REMOVE_FROM_WISHLIST', payload: {id: props.data.id}})
                                :
                                // dispatch({type: 'ADD_TO_WISHLIST', payload:{id: props.data.id}})
                                updateServer('ADD_TO_WISHLIST', {_id: props.data._id})
                        }} />
                </span>
            </div>
            <div class="card-small-content">
                <div>
                    <span class="card-small-title">{props.data.name}</span>
                    <p>
                        <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>₹{props.data.price} </span>
                        <span className="util-gray-text util-small-text"> {props.data.offer}</span>
                    </p>
                </div>
                <div className="add-to-cart" style={{ display: props.data.inStock ? '' : "none" }}>
                    <Link to={props.data.inCart ? '/cart' : ''}>
                        <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "0.85rem", border: "0.4px solid #5d5d5d", padding: "0.5rem", borderRadius: "50%", color: "#5d5d5d", pointerEvents: props.data.inStock ? "auto" : "none" }}
                            onClick={() => {
                                props.data.inCart ? dispatch({ type: 'SET_ROUTE', payload: 'CART' }) :
                                    // dispatch({type: 'ADD_TO_CART', payload: {id: props.data.id}})
                                    updateServer('ADD_TO_CART', {_id: props.data._id})
                            }}
                        />
                    </Link>
                    <span style={{ display: "block", fontSize: "0.5rem" }}>
                        {props.data.inCart ? 'GO TO CART' : 'ADD'}
                    </span>
                </div>
            </div>
        </div>
    )
}