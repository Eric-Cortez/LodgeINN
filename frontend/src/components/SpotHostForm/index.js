import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';
import { getOneSpot } from '../../store/spots';

const SpotHostForm = () => {
    const dispatch = useDispatch()

    useEffect(() => {
    
    }, [dispatch])

    return (
        <div>
           <h2>TEST</h2>
        </div>
    )
}

export default SpotHostForm;