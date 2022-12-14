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
import Ratings from "./Ratings";

function Spots() {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state?.spots?.list)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        dispatch(getAllSpots())
        // dispatch(getAllReviews())
    }, [dispatch])


    return (
        <div className="detail-pg-main-container">

            <div className="left-container">
                {allSpots?.map(spot => (
                    < div key={`0${spot?.title}1`}>
                        <div key={`${spot?.title}1`} className="spots-container">
                            <div key={`${spot?.title}2`} className="image-container">
                                <Link key={`${spot?.title}13`} to={`/spots/${spot.id}`}>
                                    {spot?.Images[0]?.url ?
                                        <img
                                            key={`${spot?.title}3`}
                                            id='spot-image'
                                            src={spot?.Images[0]?.url}
                                            alt="listing"
                                            onError={(e) => { e.target.src = 'https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg'; e.target.onError = null; }}
                                        /> : <img
                                            key={`${spot?.title}3`}
                                            id='spot-image'
                                            src='https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg'
                                            alt="listing"
                                            onError={(e) => { e.target.src = 'https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg'; e.target.onError = null; }}
                                        />

                                    }

                                </Link>
                            </div>

                            <div key={`${spot?.title}4`} className="info">

                                <Link key={`${spot?.title}5`} className="each-spot-title" to={`/spots/${spot.id}`}>
                                    {spot?.title}
                                    <div key={`1${spot?.title}5`} id="line"></div>
                                </Link>
                                <div key={`2${spot?.title}5`} className="detail-container-all">
                                    <p key={`3${spot?.title}5`} id="spot-detail-info">
                                        {`${spot?.guests} guests • ${spot?.bedrooms} beds • ${spot?.bathrooms} `}
                                        {(spot?.bathrooms !== 1) ? "baths" : "bath"}
                                    </p>
                                </div>
                                <div key={`4${spot?.title}5`} className="amenities-container-all">
                                    <p key={`5${spot?.title}5`} id='amenities-all'>
                                        {(spot?.Amenities[0]?.parking) ? 'Parking • ' : (spot?.Amenities[0]?.fireplace) ? 'Fireplace • ' : ''}
                                        {(spot?.Amenities[0]?.privateBeachAccess) ? 'Private beach access • ' : (spot?.Amenities[0]?.pool) ? 'Pool • ' : ''}
                                        {(spot?.Amenities[0]?.pets) ? 'Pets • ' : (spot?.Amenities[0]?.pets) ? 'Pets • ' : ''}
                                        {(spot?.Amenities[0]?.hotTub) ? 'Hot tub' : (spot?.Amenities[0]?.kitchen) ? 'Kitchen' : ''}</p>
                                </div>
                                <div key={`${spot?.title}7`} className="price-info-div">
                                    <div className="star-num">
                                        <Ratings spot={spot} />
                                    </div>
                                    <p key={`9${spot?.title}5`}>${spot?.price} / night</p>
                                </div>

                            </div>
                        </div>
                        <div key={`18${spot?.title}5`} className="each-line"></div>
                    </div>
                ))}
            </div>

            <div className="right-container fill">
                <img id='right-image' src='https://images.unsplash.com/photo-1551927411-95e412943b58?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FiaW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60' alt="camp" />
            </div>
        </div>
    )
}


export default Spots;