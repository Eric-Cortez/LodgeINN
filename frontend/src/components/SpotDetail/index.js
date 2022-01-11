import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import { getOneSpot } from '../../store/spots';
import "./spotDetail.css"

const SpotDetail = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams() 
    
    const oneSpot = useSelector(state => state.spots[spotId])

    useEffect(() => {
    dispatch(getOneSpot(spotId))
    },[dispatch,spotId])
   
    return (
        <div>
            <img src={oneSpot?.Images[0].url} alt="cabin" /> 
            <p>{oneSpot?.description}</p>
            <h2>{oneSpot?.title}</h2> 
            <h2>{`TESTING: ${spotId}`}</h2>
        </div>
    )
}

export default SpotDetail;