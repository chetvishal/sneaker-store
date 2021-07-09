import './User.css'
import { useAuthContext } from '../../context/authContext';
import { useNavigate, useLocation, Link } from "react-router-dom";
import {Box, Location, ShoppingCart2, RedHeart} from '../../assets/index';

export const User = () => {
    const { logoutUser } = useAuthContext();
    return (
        <div className="login">
            <div className="login-form">
                <div className="login-form-heading">
                    <span className="util-heading-medium">Hi Elon</span>
                </div>
                <div className="user-container">
                    <div className="user-container-box">
                        <Box className="user-container-box-img"/>
                        <span className="util-heading-small">Your orders</span>
                    </div>
                    <div className="user-container-box">
                        <Location className="user-container-box-img"/>
                        <span className="util-heading-small">Your Address</span>
                    </div>
                    <div className="user-container-box">
                        <ShoppingCart2 className="user-container-box-img"/>
                        <span className="util-heading-small">Your Cart</span>
                    </div>
                    <div className="user-container-box">
                        <RedHeart className="user-container-box-img"/>
                        <span className="util-heading-small">Your Wishlist</span>
                    </div>
                </div>
                <button
                        className="order-btn"
                        style={{ backgroundColor: "black" }}
                        onClick={logoutUser}
                    >LOGOUT</button>
            </div>
        </div>
    )
}