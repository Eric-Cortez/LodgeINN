import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteSpot } from '../../store/spots'
import { getAllSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import "../Forms/GlobalForm.css"

const EditDeleteListing = ({oneSpot}) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const deleteBtn = async (e) => {
        e.preventDefault()
        let deleteSpotRes;
        try {
            deleteSpotRes = await dispatch(deleteSpot(oneSpot, oneSpot?.id));
        } catch (error) {
            throw new Error("Error - Resource not found")
        }
        if (deleteSpotRes.message === "Delete Successful") {
            dispatch(getAllSpots())
        }
    }

  return (
    <div className='edit-del-listing-div'>
        <div className='edit-del-inner'>
          <Link className="btn-basic listing" to={`/spots/${oneSpot?.id}/host`}>Edit Spot</Link>
          <button className="btn-basic listing" onClick={deleteBtn}>Delete</button>
        </div>
    </div>
  )
}

export default EditDeleteListing