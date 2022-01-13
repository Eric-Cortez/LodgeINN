import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import Demo from './Demo';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <>
                <Link className="nav-links" to="/spots/host">Become a Host</Link>
                <Link className="nav-links" to="/spots"><i class="fas fa-globe"></i> Explore</Link>
                <ProfileButton className="nav-links" user={sessionUser} />
            </>

        );
    } else {
        sessionLinks = (
            <>
                <Link className="nav-links" to="/spots"><i class="fas fa-globe"></i> Explore</Link>
                <LoginFormModal />
                <NavLink className="nav-links" to="/signup">Sign Up</NavLink>
                <Demo />
            </>
        );
    }

    return (
        <nav id="navbar">
            <ul>
                <div>
                    <Link id="logo" to="/"><i id="logo-icon" className="fab fa-airbnb"></i>LodgeINN</Link>
                </div>
                <li>
                    <NavLink className="nav-links" exact to="/">Home</NavLink>
                    {isLoaded && sessionLinks}
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;