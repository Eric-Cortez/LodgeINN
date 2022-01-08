import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllSpots } from "../../store/spots"

function Spots() {
    const dispatch = useDispatch()
    const testRoute = useSelector(state => state.spots)
    

    useEffect(()=> {
        dispatch(getAllSpots())
    }, [])


    return (
        <div>
            <h3>All Spots</h3>
            <h4>{testRoute.message}</h4>
        </div>
    )
}


export default Spots;