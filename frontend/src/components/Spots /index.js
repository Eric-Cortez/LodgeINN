import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSpots } from "../../store/spots"
import { getAllReviews } from "../../store/reviews";
import { Link, Route, useParams } from 'react-router-dom';
import "./Spots.css"
import { avgStars } from "../utils";
// import GoogleMapMarkers from "../GoogleMapMarkers";
import SpotMap from "../SpotMap";

function Spots() {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state?.spots?.list)
    // const allSpotReviews = useSelector(state => state?.review?.list)
    // console.log(allSpotReviews)
     



    useEffect(() => {
        dispatch(getAllSpots())
        // dispatch(getAllReviews())
    }, [dispatch])


    return (
        <div className="detail-pg-main-container">

            <div className="left-container">
                {allSpots?.map(spot => (
                    <div>
                    <div key={`${spot?.title}1`} className="spots-container">
                        <div key={`${spot?.title}2`} className="image-container">
                            <Link key={`${spot?.title}13`} to={`/spots/${spot.id}`}>
                                <img key={`${spot?.title}3`} crossOrigin="anonymous" id='spot-image' key={spot?.id} src={spot?.Images[0]?.url} />
                            </Link>
                        </div>

                        <div key={`${spot?.title}4`} className="info">

                            <Link key={`${spot?.title}5`} className="each-spot-title" to={`/spots/${spot.id}`}>
                                {spot?.title}
                                <div id="line"></div>
                            </Link>
                                <div className="detail-container-all">
                                   <p id="spot-detail-info">
                                       {`${spot?.guests} guests • ${spot?.bedrooms} beds • ${spot?.bathrooms} `}
                                       {(spot?.bathrooms !== 1) ? "baths" : "bath"}
                                   </p>
                               </div>
                               <div className="amenities-container-all">
                                   <p id='amenities-all'>
                                       {(spot?.Amenities[0]?.parking) ? 'Parking • ' : (spot?.Amenities[0]?.fireplace) ? 'Fireplace • ' : ''}
                                    {(spot?.Amenities[0]?.privateBeachAccess) ? 'Private beach access • ' : (spot?.Amenities[0]?.pool) ? 'Pool • ' : ''}
                                       {(spot?.Amenities[0]?.pets) ? 'Pets • ' : (spot?.Amenities[0]?.pets) ? 'Pets • ' : ''}
                                       {(spot?.Amenities[0]?.hotTub) ? 'Hot tub' : (spot?.Amenities[0]?.kitchen) ? 'Kitchen' : ''}</p>
                               </div>
                                <div key={`${spot?.title}7`} className="price-info-div">
                                <i className="fas fa-star spot"></i>
                                {/* {allSpotReviews &&
                                    <span className='booking-reviews-count'><i className="fas fa-star"></i> {avgStars(allSpotReviews)} · {allSpotReviews?.length} {allSpotReviews?.length === 1 ? 'review' : 'reviews'}</span>
                                }  */}
                                    <p key={`${spot?.title}8`}>${spot?.price} / night</p>
                                </div>

                        </div>
                    </div>
                        <div className="each-line"></div>
                    </div>
                ))}
            </div>

            <div className="right-container fill">
                 {/* <GoogleMapMarkers /> */}
                 {/* <SpotMap /> */}
            
                <img id='right-image' src='https://images.unsplash.com/photo-1551927411-95e412943b58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60'/>
            
            </div>
        </div>
    )
}


export default Spots;