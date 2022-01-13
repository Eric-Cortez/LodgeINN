import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import "./spotDetail.css"
import { deleteSpot } from "../../store/spots"

const SpotDetail = ({ spotInfo, setSpotInfo}) => {
    const dispatch = useDispatch()
    const { spotId } = useParams() 
    const history = useHistory()
    
    const oneSpot = useSelector(state => state.spots[spotId])
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
    dispatch(getOneSpot(spotId))

    },[dispatch,spotId])

    const deleteBtn = async (e) => {
        e.preventDefault() 
        let deleteSpotRes;
        try {
            deleteSpotRes = await dispatch(deleteSpot(oneSpot,spotId));
            console.log(deleteSpotRes)
        } catch (error) {
            throw new Error("Error - Resource not found")
        }
        if (deleteSpotRes.message === "Delete Successful") {
           history.push("/spots")
        }
    }


    
    return (
        <div className='spot-detail'> 
            <img className="spot-image" src={oneSpot?.Images[0].url} alt="cabin" /> 
            <h1 id="title">{oneSpot?.title}</h1>
            <h2 id="one-spot">Host By: {oneSpot?.User?.username}</h2> 
            {sessionUser?.id === oneSpot?.userId &&
            <>
                <Link to={`/spots/${spotId}/host`}>Edit Spot</Link>
                <button onClick={deleteBtn}>Delete</button>
            </>
            }
            <div id="amen-icon">
                <ul> Amenities
                    <li>{`Fireplace: ${oneSpot?.Amenities[0].firePlace}`}</li>
                    <li>{`Hot Tub: ${oneSpot?.Amenities[0].hotTub}`}</li>
                    <li>{`Kitchen: ${oneSpot?.Amenities[0].kitchen}`}</li>
                    <li>{`Parking: ${oneSpot?.Amenities[0].parking}`}</li>
                    <li>{`Pets: ${oneSpot?.Amenities[0].pets}`}</li>
                    <li>{`Pool: ${oneSpot?.Amenities[0].pool}`}</li>
                    <li>{`Private Beach Access: ${oneSpot?.Amenities[0].privateBeachAccess}`}</li>
                </ul>
            </div>
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
            <h3>{`$${oneSpot?.price}`}</h3>

        </div>
    )
}

export default SpotDetail;