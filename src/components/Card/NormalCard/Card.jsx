import React from 'react';
import styles from './card.module.css';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../../context/dataContextProvider';
import { Link } from 'react-router-dom';
export const Card = ({ data }) => {

    const navigate = useNavigate();

    const { dispatch, updateServer } = useDataContext();

    return (
        <div className={styles.cardSmall}>
            <div className={styles.cardSmallImageContainer}>
                <img src={data.image} alt=""
                    onClick={() => navigate(`/product/${data._id}`)}
                    className={styles.cardSmallImage}
                />
                <span className={`simple-badge ${styles.cardBadge}`}
                    style={{ display: data.inStock ? 'none' : 'false' }}
                >OUT OF STOCK</span>
                <span className={`card-small-dismiss ${styles.cardLikeBtn}`}>
                    <FontAwesomeIcon icon={faHeart} style={{ color: data.inWishList ? '#ff5656' : '#b8b4b6' }}
                        onClick={() => {
                            data.inWishList ?
                                updateServer('REMOVE_FROM_WISHLIST', { _id: data._id })
                                :
                                updateServer('ADD_TO_WISHLIST', { data })
                        }}
                        className={`${styles.cardLikeIcon}`}
                    />
                </span>
            </div>
            <div className={styles.cardSmallContent}>
                <div>
                    <span className={styles.cardSmallTitle}>{data.name}</span>
                    <p>
                        <span className={styles.cardSmallText}>₹{data.price} </span>
                        <span className="util-gray-text util-small-text"> {data.offer}</span>
                    </p>
                </div>
                <div className={styles.cardActionBtn} style={{ display: data.inStock ? '' : "none" }}>
                    <Link to={data.inCart ? '/cart' : ''}>
                        <FontAwesomeIcon icon={faShoppingCart} style={{ pointerEvents: data.inStock ? "auto" : "none" }}
                            onClick={() => {
                                data.inCart ? dispatch({ type: 'SET_ROUTE', payload: 'CART' }) :
                                    updateServer('ADD_TO_CART', { data })
                            }}
                            className={styles.cardActionIcon}
                        />
                    </Link>
                    <span
                        className={styles.cardActionText}
                    >
                        {data.inCart ? 'GO TO CART' : 'ADD'}
                    </span>
                </div>
            </div>
        </div>
    )
}