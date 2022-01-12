import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import "./spotDetail.css"

const SpotDetail = ({ spotInfo, setSpotInfo}) => {
    const dispatch = useDispatch()
    const { spotId } = useParams() 
    
    const oneSpot = useSelector(state => state.spots[spotId])
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
    dispatch(getOneSpot(spotId))
    },[dispatch,spotId])
   



    
    return (
        <div className='spot-detail'> 
            <img className="spot-image" src={oneSpot?.Images[0].url} alt="cabin" /> 
            <h1>{oneSpot?.title}</h1>
            <h2>Host By: {oneSpot?.User?.username}</h2> 
            {sessionUser?.id === oneSpot?.userId &&
              <Link to={`/spots/${spotId}/host`}>Edit Spot</Link>}
            <p>{oneSpot?.description}</p>
            <ul> Address: 
                <li>{oneSpot?.address}</li>
                <li>{oneSpot?.city}</li>
                <li>{oneSpot?.country}</li>
                <li>{oneSpot?.state}</li>
                <li>{oneSpot?.zipCode}</li>
            </ul>
            <ul> Details: 
                <li>{`Bathrooms: ${oneSpot?.bathrooms}`}</li>
                <li>{`Bedrooms: ${oneSpot?.bedrooms}`}</li>
                <li>{`Guests: ${oneSpot?.bathrooms}`}</li>
                <li></li>
            </ul>
            <ul> Amenities: 
                <li>{`Fireplace: ${oneSpot?.Amenities[0].firePlace}`}</li>
                <li>{`Hot Tub: ${oneSpot?.Amenities[0].hotTub}`}</li>
                <li>{`Kitchen: ${oneSpot?.Amenities[0].kitchen}`}</li>
                <li>{`Parking: ${oneSpot?.Amenities[0].parking}`}</li>
                <li>{`Pets: ${oneSpot?.Amenities[0].pets}`}</li>
                <li>{`Pool: ${oneSpot?.Amenities[0].pool}`}</li>
                <li>{`Private Beach Access: ${oneSpot?.Amenities[0].privateBeachAccess}`}</li>
            </ul>
            <h3>{`$${oneSpot?.price}`}</h3>

        </div>
    )
}

export default SpotDetail;