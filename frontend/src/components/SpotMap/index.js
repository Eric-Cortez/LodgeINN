import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { getOneSpot, deleteSpot } from "../../store/spots";
import './SpotMap.css'



const SpotMap = ({ oneSpot }) => {
  
    let environment = process.env.REACT_APP_GOOGLE_API_KEY
  
  
    return (
        <iframe
            className='embed-map'
            title='location-map'
            src={`https://www.google.com/maps/embed/v1/place?key=${environment}
            &q=${oneSpot?.address},${oneSpot?.city}+${oneSpot?.state}`}>
        </iframe>
    )


}


export default SpotMap