import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import "./NotFound.css"

const NotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])


  return (
      <div id="error-404-div">
          <div id="inner-404-div">
              <h1 id="error-msg">404</h1>
              <h2 id="page-not-found-404">Page not found.</h2>
              <h3 >Sorry, the page you were looking for does not exist</h3>
              <Link className="btn-home-back" to="/">Go back to LodgeINN</Link>
          </div>
      </div>
  )
}

export default NotFound