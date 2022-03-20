import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSpots } from "../../store/spots"
import { getAllReviews } from "../../store/reviews";
import { Link, Route, useParams } from 'react-router-dom';
import "./Spots.css"
import { avgStars } from "../utils";

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
                ))}
            </div>

            <div className="right-container fill">
                <img id='map-image' src='https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fr1.ilikewallpaper.net%2Fiphone-13-pro-max-wallpapers%2Fdownload-110065%2Fmountains-5k-4k-8k-lake-forest-Nature.jpg' alt="google map"/>
            </div>
        </div>
    )
}


export default Spots;