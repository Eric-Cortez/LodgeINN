import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSpots } from "../../store/spots"

function Spots() {
    const dispatch = useDispatch()
    const allSpots = useSelector(state => state.spots.list)
    console.log(allSpots[1])
   

    useEffect(()=> {
        dispatch(getAllSpots())
    }, [])


    return (
        <div>
            <h3>All Spots</h3>
            {allSpots.map(spot => (
                <div key={spot.id}>
                    <h4 key={spot.title}>{spot.title}</h4>
                    <img key={spot.id} src={spot.Images[0].url} alt="cabin"/>
                    <h5 key={spot.description}>{spot.description}</h5>
                    <h5 key={spot.price}>{spot.price}</h5>
                </div>
            ))}
        </div>
    )
}


export default Spots;