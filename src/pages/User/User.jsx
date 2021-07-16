import styles from './User.module.css'
import { useAuthContext } from '../../context/authContext';
import { useNavigate, useLocation, Link } from "react-router-dom";
import {Box, Location, ShoppingCart2, RedHeart} from '../../assets/index';

export const User = () => {
    const { logoutUser } = useAuthContext();
    return (
        <div className={styles.user}>
            <div className={styles.userContainer}>
                <div className={styles.userContainerHeading}>
                    <span className="util-heading-medium">Hi Elon</span>
                </div>
                <div className={styles.userActionList}>
                    <div className={styles.userActionBtn}>
                        <Box className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Your orders</span>
                    </div>
                    <div className={styles.userActionBtn}>
                        <Location className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Your Address</span>
                    </div>
                    <div className={styles.userActionBtn}>
                        <ShoppingCart2 className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Your Cart</span>
                    </div>
                    <div className={styles.userActionBtn}>
                        <RedHeart className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Your Wishlist</span>
                    </div>
                </div>
                <button
                        className="submit-button"
                        style={{ backgroundColor: "black" }}
                        onClick={logoutUser}
                    >LOGOUT</button>
            </div>
        </div>
    )
}