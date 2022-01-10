import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch,  } from 'react-redux';
import { getOneSpot } from '../../store/spots';

const SpotDetail = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams() 
    const oneSpot = useSelector(state => state.spots[spotId])
  
    useEffect(() => {
    dispatch(getOneSpot(spotId))
    },[dispatch,spotId])
   
    return (
        <div>
            <img src={oneSpot.Images[0].url} alt="cabin" /> 
            <p>{oneSpot.description}</p>
        </div>
    )
}

export default SpotDetail;