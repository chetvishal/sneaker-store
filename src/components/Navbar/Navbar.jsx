import React, { useRef } from 'react';
import './navbar.css';
import '../CSS/badge.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch, faHome, faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDataContext } from '../../context/dataContextProvider';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';

export const Navbar = ({ setInput }) => {

    const { state } = useDataContext();
    const check = useRef(null);
    const { isUserLoggedIn } = useAuthContext();

    const handleCheck = () => check.current.checked = false;

    return (
        <header>
            <input type="checkbox" id="nav-toggle" className="nav-toggle"
                ref={check}
            />
            <nav className="navbar">
                <Link to="/" className="nav-logo">
                    <span>sneaker.store</span>
                </Link>
                <ul className="nav-list">
                    <li>
                        <div className="search-box">
                            <input type="text" onChange={e => setInput(e.target.value)} className="nav-inputbox"
                                placeholder="Search"
                            />
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                    </li>
                    <li>
                        {/* <a href="/"
                            onClick={handleCheck}
                        > */}
                        <Link to="/"
                            onClick={handleCheck}
                        >
                            <span className="icon-badge">
                                <i style={{ fontStyle: "normal" }}>
                                    <FontAwesomeIcon icon={faHome} />
                                    <span className="nav-icon-label">Home</span>
                                </i>
                            </span>
                        </Link>
                        {/* </a> */}
                    </li>
                    <li>
                        {/* <a href="/cart"
                            onClick={handleCheck}
                        > */}
                        <Link to="/cart"
                            onClick={handleCheck}
                        >
                            <span className="icon-badge">
                                <i style={{ fontStyle: "normal" }}>
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    <span className="nav-icon-label">Cart</span>
                                    <span className="avatar-badge-notification-icon" style={{ display: state.cart.length ? 'inline' : 'none' }}><span className="notification-value">{state.cart.length}</span></span>
                                </i>
                            </span>
                        </Link>
                        {/* </a> */}
                    </li>
                    <li>
                        {/* <a href="/wishlist"
                            onClick={handleCheck}
                        > */}
                        <label htmlFor="nav-toggle">
                            <Link to="wishlist"
                                onClick={handleCheck}>
                                <span className="icon-badge">
                                    <i style={{ fontStyle: "normal" }}>
                                        <FontAwesomeIcon icon={faHeart} />
                                        <span className="nav-icon-label">Wishlist</span>
                                        <span className="avatar-badge-notification-icon" style={{ display: state.wishList.length ? 'inline' : 'none' }}><span className="notification-value"> {state.wishList.length}</span></span>
                                    </i>
                                </span>
                            </Link>
                        </label>
                        {/* </a> */}
                    </li>
                    <li>
                        {/* <a href="/"
                            onClick={handleCheck}
                        > */}
                            <Link to={isUserLoggedIn ? "/user" : "/login"}
                            onClick={handleCheck}>
                                <span className="icon-badge">
                                    <i style={{ fontStyle: "normal" }}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="nav-icon-label">User</span>
                                    </i>
                                </span>
                            </Link>
                        {/* </a> */}
                    </li>
                </ul>
            </nav>
            <label htmlFor="nav-toggle" className="nav-toggle-label">
                <span>
                    <FontAwesomeIcon icon={faBars} className="bars" />
                    <FontAwesomeIcon icon={faTimes} className="times" />
                </span>
            </label>
        </header>
    )
}