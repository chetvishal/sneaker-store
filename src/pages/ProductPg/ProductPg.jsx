import { useDataContext } from '../../context/dataContextProvider';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Load from '../../assets/3.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import styles from  "./ProductPg.module.css"

export const ProductPg = () => {

    const { state, updateServer } = useDataContext();
    const { products, cart, wishList } = state;
    const { id } = useParams();
    const findObj = products.find(item => item._id === id)
    const navigate = useNavigate();

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
            <img src={Load} alt="loading" /> :
            <div className={styles.productBody}>
                <div className={`${styles.productCard} ${styles.productDescription}`}>
                    <div className={styles.productImageContainer}>
                        <img src={data.image} className={styles.productImage} alt="" />
                        <div className={styles.userActionButtons}
                            style={{ display: data.inStock ? "" : "none" }}
                        >
                            <div className={styles.actionButton}
                                onClick={() => data.inCart ? navigate('/cart') : updateServer('ADD_TO_CART', { data })}
                            >
                                <FontAwesomeIcon icon={faShoppingCart} style={{
                                    color: "#5d5d5d",
                                }} 
                                    className={styles.actionBtnIcon}
                                />
                                <span className={styles.actionBtnTxt}>
                                    {data.inCart ? 'GO TO CART' : 'ADD TO CART'}
                                </span>
                            </div>
                            <div className={styles.actionButton} style={{ marginLeft: "0.5rem" }}
                                onClick={() => data.inWishList ?
                                    updateServer('REMOVE_FROM_WISHLIST', { _id: data._id }) :
                                    updateServer('ADD_TO_WISHLIST', { data })}
                            >
                                <FontAwesomeIcon icon={faHeart} style={{
                                    color: data.inWishList ? '#ff5656' : '#b8b4b6',
                                }} 
                                    className={styles.actionBtnIcon}
                                />
                                <span className={styles.actionBtnTxt}>
                                    {data.inWishList ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.productDetails}>
                        <span className={styles.productTitle}>{data.name}</span>
                        <p className={styles.productInfoList}>
                            <span className={styles.productPrice}>₹{data.price} </span>
                            <span className={`util-gray-text ${styles.productOffer}`} > {data.offer}</span>
                            <span className={styles.productDeliveryOption}>{data.fastDelivery ? "Fast Delivery" : "Fast Delivery not Available"}</span>
                            <span className={styles.productInStock} style={{ color: data.inStock ? 'green' : 'red', }}>{data.inStock ? "In Stock" : "Out of stock"}</span>
                        </p>
                    </div>
                </div>
            </div>
    )
}