import { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import "./spotDetail.css"
import { deleteSpot } from "../../store/spots"
import BookingDetails from "../BookingDetails"
import SpotMap from '../SpotMap';
import { Reviews } from '../Reviews';
import { getAllReviews } from "../../store/reviews"
import { avgStars } from '../utils';
import UserSpotStickyDiv from './UserSpotStickyDiv';


const SpotDetail = ({ spotInfo, setSpotInfo}) => {
    const dispatch = useDispatch()
    const { spotId } = useParams() 
    const history = useHistory()
    
    const oneSpot = useSelector(state => state?.spots[spotId])
    const sessionUser = useSelector(state => state?.session?.user);
    const allSpotReviews = useSelector(state => state?.reviews)


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
    dispatch(getOneSpot(spotId))
    dispatch(getAllReviews(spotId))

    },[dispatch,spotId])
   
    return (
        <div className='spot-detail'> 
         <div className='detail-upper-main'>
            <h1 id="title-1">{oneSpot?.title}</h1>
            <img 
            className="spot-image-new" 
            src={oneSpot?.Images[0].url} 
            alt="cabin" 
            onError={(e) => { e.target.src = 'https://sonuptraders.com/wp-content/uploads/2019/02/picture-not-available.jpg'; e.target.onError = null; }}/> 
         </div>

        <div className='post-content-main'>
            <div className='left-spot-detail-pg'>
            <h1 id="title">Host By: {oneSpot?.User?.username}</h1>
            <div>
                <p id="detail-p">
                    {`${oneSpot?.guests} guests • ${oneSpot?.bedrooms} bedrooms • ${oneSpot?.bathrooms} `}
                    {(oneSpot?.bathrooms !== 1) ? "baths" : "bath"}
                </p>
            </div>
        

            <div id="info">
                <h3 ><i className="fas i-list fa-home"></i>Entire home</h3>
                <p className="list-details">You’ll have the guesthouse to yourself.</p>
                <h3><i className="fas i-list fa-hand-sparkles"></i>Enhanced Clean</h3>
                <p className="list-details">This Host committed to LodgeINN's 5-step enhanced cleaning process.</p>
                <h3><i className="fas i-list fa-map-marker-alt"></i>Great location</h3>
                <p className="list-details">100% of recent guests gave the location a 5-star rating.</p>
                <h3><i className="fas i-list fa-map-marker-alt"></i>Great check-in experience</h3>
                <p className="list-details">95% of recent guests gave the check-in process a 5-star rating.</p>
            </div>
            <h3>{oneSpot?.city}, {oneSpot?.state}</h3>
            <p id='p-text'>{oneSpot?.description}
           </p> 

            <h3>Amenities</h3>
            <div className="amen-icon">
                    <div className="left-amenities">
                    
                    <h4>{(oneSpot?.Amenities[0]?.firePlace) ? <p><i className="fas symb fa-fire"></i> Fireplace</p>: ''}</h4>
                    <h4>{(oneSpot?.Amenities[0]?.hotTub) ? <p><i className="fas symb fa-hot-tub"></i> Hot Tub</p> : ''}</h4>
                    <h4>{(oneSpot?.Amenities[0]?.kitchen) ? <p>< i className="fas symb fa-blender"></i> Kitchen</p> : ''}</h4>
                    <h4>{(oneSpot?.Amenities[0]?.parking) ? <p>< i className="fas symb fa-parking"></i> Parking </p> : ''}</h4>
                    </div>
                    <div className="right-amenities">
                    <h4>{(oneSpot?.Amenities[0]?.pets) ? <p><i className="fas symb fa-cat"></i> Pets </p> : ''}</h4>
                    <h4>{(oneSpot?.Amenities[0]?.pool) ? <p><i className="fas symb fa-swimmer"></i> Pool </p> : ''}</h4>
                    <h4>{(oneSpot?.Amenities[0]?.privateBeachAccess) ? <p><i className="fas symb fa-umbrella-beach"></i> Private Beach Access </p> : ''}</h4>
                    </div>
            </div>

            {sessionUser?.id !== oneSpot?.User?.id &&
            <div className='review-div'>
                           
                {allSpotReviews && avgStars(allSpotReviews?.list) === "0.0" ?
                     <h3 className='spot-rating-count'> 
                        <i className="fas fa-star rating-review"></i> 0 • {allSpotReviews?.list?.length} {allSpotReviews?.list?.length === 1 ? 'review' : 'reviews'}
                    </h3> :

                    <h3 className='spot-rating-count'> 
                        <i className="fas fa-star rating-review"></i>{allSpotReviews?.list?.length ? avgStars(allSpotReviews?.list) : ""} • {allSpotReviews?.list?.length} {allSpotReviews?.list?.length === 1 ? 'review' : 'reviews'}
                    </h3>
                }          
              
                 <Reviews spot={oneSpot} user={sessionUser}/>
            </div>}

            <div className='google-map-div'>
               <h4>Where you'll be</h4>
                <SpotMap oneSpot={oneSpot} />
            </div>

            </div>
                {sessionUser?.id !== oneSpot?.User?.id &&
                <BookingDetails spotId={spotId} spot={oneSpot} user={sessionUser} allSpotReviews={allSpotReviews?.list} />
               }
                {sessionUser?.id === oneSpot?.User?.id && 
                <UserSpotStickyDiv spotId={spotId} oneSpot={oneSpot}/>}
        </div>
        </div>
    )
}

export default SpotDetail;