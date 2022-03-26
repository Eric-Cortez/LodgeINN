import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import "./footer.css"


function Footer() {
    return (
        <>
            <div className='footer-line'></div>
            <footer className='footer' id="footer-style">
                <p id='developed-by'>Developed By: Eric Cortez</p>
                <a id='git-linked' href='https://github.com/Eric-Cortez/LodgeINN' target="_blank" rel="noreferrer"><i className="fab foot-icon fa-github"></i></a>
                <a id='git-linked' href='https://www.linkedin.com/in/eric-cortez-0101/' target="_blank" rel="noreferrer"><i className="fab foot-icon fa-linkedin"></i></a>
            </footer>
        </>
    )
}

export default Footer;