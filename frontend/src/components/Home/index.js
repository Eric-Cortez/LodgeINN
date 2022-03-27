import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import "./home.css"
import AddHostFormModal from "../../context/AddHostFormModal"

const Home = () => {
  const sessionUser = useSelector(state => state.session.user);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  
  return (
    <div>
    <div id="main-home-container">
      <div></div>
      <div className='top-container'>
        <div className='top-inner'>

          <h2 className="centered">Let your curiosity do the booking</h2>
          <Link className="centered-button" to="/spots">I'm flexible</Link>
        </div>
      </div>

      <div className='middle-container'>
        <div className='top-inner'>

          <h2 className="centered">What's next?</h2>
          <Link className="centered-button" to="/spots">Explore</Link>
        </div>
      </div>

    </div> 
      <div className='bottom-container'>
        <div className='top-inner'>
          <h2 className="centered">Interested in hosting?</h2>
          {sessionUser &&
          <AddHostFormModal type={"home"}/>
          // <Link className="centered-button" to="/spots/host">Host</Link>
          }
        </div>
      </div>
    </div>
  )
}

export default Home;