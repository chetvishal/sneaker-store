import styles from './User.module.css'
import { useAuthContext } from '../../context/authContext';
import { useDataContext } from '../../context/dataContextProvider';
import { useNavigate } from "react-router-dom";
import {Box, ShoppingCart2, RedHeart, Home} from '../../assets/index';

export const User = () => {
    const { logoutUser, userDetails } = useAuthContext();
    const {updateServer} = useDataContext();
    const navigate = useNavigate()
    const logoutHandler = () => {
        logoutUser()
        updateServer("LOGOUT")
    }
    return (
        <div className={styles.user}>
            <div className={styles.userContainer}>
                <div className={styles.userContainerHeading}>
                    <span className="util-heading-medium">Hi {userDetails.username}</span>
                </div>
                <div className={styles.userActionList}>
                    <div className={styles.userActionBtn} onClick={()=>navigate('/cart')}>
                        <Box className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Orders</span>
                    </div>
                    <div className={styles.userActionBtn}  onClick={()=>navigate('/')}>
                        <Home className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Home</span>
                    </div>
                    <div className={styles.userActionBtn}  onClick={()=>navigate('/cart')}>
                        <ShoppingCart2 className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Cart</span>
                    </div>
                    <div className={styles.userActionBtn}  onClick={()=>navigate('/wishlist')}>
                        <RedHeart className={styles.userActionImg}/>
                        <span className={`util-heading-small ${styles.userActionTxt}`}>Wishlist</span>
                    </div>
                </div>
                <button
                        className="submit-button"
                        style={{ backgroundColor: "black" }}
                        onClick={logoutHandler}
                    >LOGOUT</button>
            </div>
        </div>
    )
}