import { useDataContext } from '../../context/cartContextProvider';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Load from '../../assets/3.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./ProductPg.css"

export const ProductPg = () => {

    const { state, dispatch, updateServer } = useDataContext();
    const { products, cart, wishList } = state;
    const { id } = useParams();
    const findObj = products.find(item => item._id === id)
    const navigate = useNavigate();

    // console.log("products from id: ", data)

    const inCartAndWishList = (item) => {
        return {
            ...item,
            inCart: cart.find(cartItem => cartItem._id._id === item._id) ? true : false,
            inWishList: wishList.find(wishItem => wishItem._id._id === item._id) ? true : false
        }
    }

    const data = inCartAndWishList(findObj)

    return (

        data === undefined ?
            <img src={Load} /> :
            <div className="cart-card product-description">
                <div className="cart-image">
                    <img src={data.image} alt="" />
                </div>
                <div className="cart-details">
                    <span className="cart-item-title">{data.name}</span>
                    <p>
                        <span style={{ fontWeight: "bold" }}>₹{data.price} </span>
                        <span className="util-gray-text" style={{ fontSize: "1rem" }}> {data.offer}</span>
                        <span style={{ display: "block" }}>{data.fastDelivery ? "Fast Delivery" : "Fast Delivery not Available"}</span>
                        <span style={{ display: "block", color: data.inStock ? 'green' : 'red', fontWeight: "bolder" }}>{data.inStock ? "In Stock" : "Out of stock"}</span>
                    </p>
                    <div className="action-buttons"
                        style={{display: data.inStock ? "" : "none"}}
                    >
                        <div className="action-btn"
                            onClick={() => data.inCart ? navigate('/cart') : updateServer('ADD_TO_CART', { _id: data._id })}
                        >
                            <FontAwesomeIcon icon={faShoppingCart} style={{
                                fontSize: "0.85rem",
                                border: "0.4px solid #5d5d5d",
                                padding: "0.5rem",
                                borderRadius: "50%",
                                color: "#5d5d5d",
                                // pointerEvents: props.data.inStock ? "auto" : "none"
                            }} />
                            <span style={{ display: "inline", fontSize: "0.5rem", marginLeft: "0.5rem" }}>
                                {data.inCart ? 'GO TO CART' : 'ADD TO CART'}
                            </span>
                        </div>
                        <div className="action-btn" style={{ marginLeft: "0.5rem" }}
                            onClick={() => data.inWishList ?
                                updateServer('REMOVE_FROM_WISHLIST', { _id: data._id }) :
                                updateServer('ADD_TO_WISHLIST', { _id: data._id })}
                        >
                            <FontAwesomeIcon icon={faHeart} style={{
                                fontSize: "0.85rem",
                                border: "0.4px solid #5d5d5d",
                                padding: "0.5rem",
                                borderRadius: "50%",
                                color: data.inWishList ? '#ff5656' : '#b8b4b6',
                            }} />
                            <span style={{ display: "inline", fontSize: "0.5rem", marginLeft: "0.5rem" }}>
                                {data.inWishList ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
    )
}