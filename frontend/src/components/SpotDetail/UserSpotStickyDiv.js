import React from 'react'
import { useHistory } from 'react-router-dom'
import "../../components/BookingDetails/BookingDetails.css"
import { deleteSpot } from '../../store/spots'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const UserSpotStickyDiv = ({oneSpot, spotId}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const deleteBtn = async (e) => {
        e.preventDefault()
        let deleteSpotRes;
        try {
            deleteSpotRes = await dispatch(deleteSpot(oneSpot, spotId));
        } catch (error) {
            throw new Error("Error - Resource not found")
        }
        if (deleteSpotRes.message === "Delete Successful") {
            history.push("/spots")
        }
    }


  return (
      <div className='booking-div'>
          <div className='upper-booking-detail-div'>
              <h4 className='booking-manage'>Manage Listing</h4>
              <Link className="spot-new edit" to={`/spots/${spotId}/host`}>Edit Spot</Link>
              <button className="spot-new del" onClick={deleteBtn}>Delete</button>
          </div>
      </div>
  )
}

export default UserSpotStickyDiv