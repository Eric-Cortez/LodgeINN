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
            <img className="spot-image-new" src={oneSpot?.Images[0].url} alt="cabin" /> 
            <h1 id="title">{oneSpot?.title}</h1>
            <p id="one-price">{`$${oneSpot?.price}`} <>/ night</></p>

            <div>
                <p id="detail-p">
                    {`${oneSpot?.guests} guests • ${oneSpot?.bedrooms} bedrooms • ${oneSpot?.bathrooms} `}
                    {(oneSpot?.bathrooms !== 1) ? "baths" : "bath"}
                </p>
            </div>
        
            {sessionUser?.id === oneSpot?.userId &&
            <>
                <Link to={`/spots/${spotId}/host`}>Edit Spot</Link>
                <button onClick={deleteBtn}>Delete</button>
            </>
            }
            <div id="info">
                <h3 ><i class="fas i-list fa-home"></i>Entire home</h3>
                <p class="list-details">You’ll have the guesthouse to yourself.</p>
                <h3><i class="fas i-list fa-hand-sparkles"></i>Enhanced Clean</h3>
                <p class="list-details">This Host committed to Airbnb's 5-step enhanced cleaning process.</p>
                <h3><i class="fas i-list fa-map-marker-alt"></i>Great location</h3>
                <p class="list-details">100% of recent guests gave the location a 5-star rating.</p>
                <h3><i class="fas i-list fa-map-marker-alt"></i>Great check-in experience</h3>
                <p class="list-details">95% of recent guests gave the check-in process a 5-star rating.</p>
            </div>
            <h3>{oneSpot?.city}, {oneSpot?.state}</h3>
            <p id='p-text'>{oneSpot?.description}
            <h2 id="one-spot"> Host By: {oneSpot?.User?.username}</h2></p> 

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
        </div>
    )
}

export default SpotDetail;