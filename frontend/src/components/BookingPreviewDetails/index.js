import React from 'react'
import { dateFormatOrder, dayCount } from '../utils'
import "./BookingPreviewDetails.css"

const BookingPreviewDetails = ({ allSpots, spotId, date, allUsers }) => {
  return (
    <div className='trip-detail-main'>
      <h2 className='trip-detail-head'>Trip details</h2>

      <div className='trip-info-modal'>
        <img
          className="trip-image-small modal"
          src={`${allSpots[spotId]?.Images[0]?.url}`}
          alt="spot"
          onError={(e) => { e.target.src = 'https://filestore.community.support.microsoft.com/api/images/ext?url=https%3A%2F%2Fanswersstaticfilecdnv2.azureedge.net%2Fstatic%2Fimages%2Fimage-not-found.jpg'; e.target.onError = null; }} />
        <div className='trip-detail-upper-info'>

          <h4 className='trip-detail-h4'>Address</h4>
          <p className='trip-modal-p'>{allSpots[spotId]?.address}</p>
          <p className='trip-modal-p'>{allSpots[spotId]?.city}, {allSpots[spotId]?.state} {allSpots[spotId]?.zipCode}</p>
        </div>

      </div>
      <div className='booking-line light'></div>

      <div>
        <h4 className='trip-detail-h4'>Cabin details</h4>
        <p className='trip-modal-p'>{allSpots[spotId]?.title}</p>
        <p className='trip-modal-p'>Hosted by {allUsers[allSpots[date[1].spotId]?.userId]?.username}</p>
      </div>

      <div className='booking-line light'></div>

      <div>
        <h4 className='trip-detail-h4'>Travel Dates</h4>
        <p className='trip-modal-p'>{dateFormatOrder(new Date(date[0]), new Date(date[1]?.endDate))}</p>
      </div>

      <div className='booking-line light'></div>

      <div>
        <h4 className='trip-detail-h4'>Billing Summary</h4>
        <p className='trip-modal-p'>Guest count: {date[1]?.guestCount} {date[1]?.guestCount === 1 ? `guest` : `guests`}</p>
        <p className='trip-modal-p'>Price / night: {`$${allSpots[spotId]?.price}`} x {dayCount(date[1]?.startDate, date[1]?.endDate)} {dayCount(date[1]?.startDate, date[1]?.endDate) === 1 ? "night" : "nights"}</p>
        <p className='trip-modal-p'>Sales tax: {`$${Number.parseFloat(allSpots[spotId]?.price * 0.092).toFixed(2)}`}</p>

        <div className='booking-line light'></div>

        <p className='total-price last new'>Total: {`$${allSpots[spotId]?.price * dayCount(date[1]?.startDate, date[1]?.endDate) + +Number.parseFloat(allSpots[spotId]?.price * 0.092).toFixed(2)}`}</p>
      </div>

    </div>
  )
}

export default BookingPreviewDetails