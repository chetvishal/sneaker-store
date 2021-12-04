import { useDataContext } from '../../context/dataContextProvider';
import { Card } from '../../components/index';
import styles from './wishlist.module.css';
import { Heart } from '../../assets/index.js';

export const WishList = () => {

    const { state } = useDataContext();
    const { wishList, cart } = state;

    const newList = wishList.map(item => {
        return {
            ...item,
            inWishList: true,
            inCart: cart.find(cartItem => cartItem._id._id === item._id._id) ? true : false,
        }
    })

    return (
        <div className={styles.wishListComponent}>
            <span className={`util-heading-medium ${styles.wishListHeading}`}>
                <div className={styles.wishlistHeading}>
                    WISHLIST
                    <Heart style={{ width: "2rem", marginLeft: "1rem" }} />
                </div>
            </span>
            <div className={styles.wishList}>
                {newList.map(i => {
                    const data = { ...i._id, inWishList: i.inWishList, inCart: i.inCart }
                    return i.inWishList ? <Card key={i._id._id} data={data} /> : null
                })}
            </div>
        </div>
    )
}