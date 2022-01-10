import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSpots } from "../../store/spots"
import { Link, Route, useParams } from 'react-router-dom';
import "./spots.css"

function Spots() {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots.list)
    // console.log(allSpots[1])
   

    useEffect(()=> {
        dispatch(getAllSpots())
    }, [])


    return (
        <div className="main-container">
            <div className="left-container">
                {allSpots.map(spot => (
                    <div className="spots-container">
                        <div className="image-container">
                            <img id='spot-image' key={spot.id} src={spot.Images[0].url} />
                        </div>
                        <div className="info">
                            <Link to={`/spots/${spot.id}`}>
                                <h2 key={spot.id}>{spot.title}</h2>
                            </Link>
                            <ul> Spot Details
                                <li key={spot.id}>Cost: ${spot.price}</li>
                                <li key={spot.id}>{spot.address}</li>
                                <li key={spot.id}>{spot.city}</li>
                                <li key={spot.id}>{spot.state}</li>
                                <li key={spot.id}>{spot.zipCode}</li>
                                <li key={spot.id}>Guests:{spot.guests}</li>
                                <li key={spot.id}>Bedrooms: {spot.bedrooms}</li>
                                <li key={spot.id}>Bathrooms: {spot.bathrooms}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div className="right-container fill">
                <img id='map-image' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexternal-preview.redd.it%2Faelg3hW63-yFWc1rT8a8PbTbnoqAp2shCCjydPtzjwo.jpg%3Fauto%3Dwebp%26s%3Ddd8d3ae4c73a95c4d746f5bcf8672aba2b7250b4&f=1&nofb=1' />
            </div>
        </div>
    )
}


export default Spots;