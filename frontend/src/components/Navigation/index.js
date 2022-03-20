import React from 'react';
import {  Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import Demo from './Demo';
import './Navigation.css';
import SearchBar from '../SearchBar';
import AddHostFormModal from '../../context/AddHostFormModal/Index';
import LoginFormModal from '../../context/LoginFormModal';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <AddHostFormModal />
                {/* <Link className="nav-links" to="/spots/host">Become a Host</Link> */}
                <NavLink className="nav-hover" to="/spots"><i className="fas fa-globe"></i> Explore</NavLink>
                <ProfileButton  user={sessionUser} />
            </>

        );
    } else {
        sessionLinks = (
            <>
                <NavLink className="nav-hover" to="/spots"><i className="fas fa-globe"></i> Explore</NavLink>
                <LoginFormModal />
                <NavLink className="nav-hover" to="/signup">Sign Up</NavLink>
                <Demo />
            </>
        );
    }

    return (
        <nav id="navbar">
            <ul className='main-nav-ul'>
                <li className='main-logo-nav'>
                    <Link id="logo" to="/">
                        <i id="logo-icon" className="fab fa-airbnb"></i>LodgeINN
                    </Link>
                </li>
                <li className='search-main'>
                    <SearchBar />
                </li>
                <li className='all-nav-links'>
                    <NavLink className="nav-hover" exact to="/">Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;