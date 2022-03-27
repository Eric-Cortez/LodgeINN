import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/")
    };

    return (
        <>
            <button  id="user-btn" onClick={openMenu}>
                <div className="dropdown-profile-btn">
                    <i className="fas fa-bars" />
                    <img 
                    className='nav-profile-img' 
                    src={"https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"} 
                    alt="profile " 
                        onError={(e) => { e.target.src = 'https://sonuptraders.com/wp-content/uploads/2019/02/picture-not-available.jpg'; e.target.onError = null; }}/>  
                </div>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    {/* <li className="dropdown-links">{user.username}</li> */}
                    
                     <Link to={`/users/${user?.id}/trips`} className="dropdown-link">
                    <li className="dropdown-links">
                       Trips
                    </li></Link>

                    <Link to={`/users/${user?.id}/listings`} className="dropdown-link">
                    <li className="dropdown-links">
                        Manage listings
                       
                    </li></Link>

                    <li className="dropdown-links">
                        <button id="logOut" onClick={logout}>Log Out</button>
                    </li>
                </ul>
            )}
        </>
    );
}

export default ProfileButton;