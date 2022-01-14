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

            <h3>Amenities</h3>
            <div className="amen-icon">
                    <div className="left-amenities">
                    
                        <p>{(oneSpot?.Amenities[0]?.firePlace) ? <p><i className="fas symb fa-fire"></i> Fireplace</p>: ''}</p>
                    <p>{(oneSpot?.Amenities[0]?.hotTub) ? <p><i class="fas symb fa-hot-tub"></i> Hot Tub</p> : ''}</p>
                    <p>{(oneSpot?.Amenities[0]?.kitchen) ? <p>< i className="fas symb fa-blender"></i> Kitchen</p> : ''}</p>
                    <p>{(oneSpot?.Amenities[0]?.parking) ? <p>< i className="fas symb fa-parking"></i> Parking </p> : ''}</p>
                    </div>
                    <div className="right-amenities">
                    <p>{(oneSpot?.Amenities[0]?.pets) ? <p><i className="fas symb fa-cat"></i> Pets </p> : ''}</p>
                    <p>{(oneSpot?.Amenities[0]?.pool) ? <p><i className="fas symb fa-swimmer"></i> Pool </p> : ''}</p>
                    <p>{(oneSpot?.Amenities[0]?.privateBeachAccess) ? <p><i class="fas symb fa-umbrella-beach"></i> Private Beach Access </p> : ''}</p>
                    </div>
            </div>
        </div>
    )
}

export default SpotDetail;