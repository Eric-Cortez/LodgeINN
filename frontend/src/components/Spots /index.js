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
                            {/* {spot.Images[0].url &&
                            <img id='spot-image' key={spot.id} src={spot.Images[0].url} />
                            } */}
                        </div>
                        <div className="info">
                            <Link to={`/spots/${spot.id}`}>
                                <h2 key={spot.title}>{spot.title}</h2>
                            </Link>
                            <ul class="details"> 
                                <li key={spot.price}>Cost: ${spot.price}</li>
                                <li key={spot.address}>{spot.address}</li>
                                <li key={spot.city}>{spot.city}</li>
                                <li key={spot.state}>{spot.state}</li>
                                <li key={spot.zipCode}>{spot.zipCode}</li>
                                <li key={spot.guests}>Guests:{spot.guests}</li>
                                <li key={spot.bedrooms}>Bedrooms: {spot.bedrooms}</li>
                                <li key={spot.bathrooms}>Bathrooms: {spot.bathrooms}</li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            <div className="right-container fill">
                {/* <img id='map-image' src='https://images.unsplash.com/photo-1530738270955-2ed78de5c2a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=705&q=80' /> */}
                <img id='map-image' src='https://images.unsplash.com/photo-1614021026464-5ebe74fd55ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80' />
            </div>
        </div>
    )
}


export default Spots;