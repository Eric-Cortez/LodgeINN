import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import "./home.css"
const Home = () => {
  
    return (
        <div id="main-home-container">
          <div className='top-container'>
          <img id="first-img" src="https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"/>
          </div>
          <div className='middle-container'>
          <img id="first-img" src="https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" /> 
          </div>
          <div className='bottom-container'>
          <img id="first-img" src="https://images.unsplash.com/photo-1572455825634-2c63e14ecae1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" /> 
          </div>
          <footer>footer</footer>
        </div>
    )
}

export default Home;