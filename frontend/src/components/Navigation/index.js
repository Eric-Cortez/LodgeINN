import React from 'react';
import {  Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Demo from './Demo';
import './Navigation.css';
import SearchBar from '../SearchBar';
import SignupFormModal from '../../context/SignupFormModal';
import LoginFormModal from "../../context/LoginFormModal"
import AddHostFormModal from '../../context/AddHostFormModal/Index';


function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <AddHostFormModal />
                <NavLink className="nav-hover" to="/spots"><i className="fas fa-globe"></i> Explore</NavLink>
                <ProfileButton  user={sessionUser} />
            </>

        );
    } else {
        sessionLinks = (
            <>
                <NavLink className="nav-hover" to="/spots"><i className="fas fa-globe"></i> Explore</NavLink>
                <LoginFormModal />
                
                <SignupFormModal />
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
                    {/* still need to finnish search implementation*/}
                    {/* <SearchBar /> */}
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