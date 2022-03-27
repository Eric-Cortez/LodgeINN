import React, {useEffect} from 'react'
import { dateFormatOrder, dayCount } from '../utils'
import "../BookingPreviewDetails/BookingPreviewDetails.css"
import "./BookingConfirmation.css"
import { useHistory, useParams } from 'react-router-dom'
import { getAllSpots } from '../../store/spots'
import { useDispatch, useSelector, } from 'react-redux';
import { getAllUsers } from '../../store/users'
import { getAllBookings } from "../../store/booking"


const BookingConfirmation = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {userId, bookingId} = useParams()
    console.log(bookingId)
    
    const allSpots = useSelector(state => state?.spots)
    const allUsers = useSelector(state => state?.users)
    const allBookings = useSelector(state => state?.booking?.list)
    const currBooking = allBookings.find(booking => booking?.id === +bookingId)
    const spotId = currBooking?.spotId
    // const allSpotsArr = Object.values(spots)
   
    
    

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getAllUsers())
        dispatch(getAllBookings())
    }, [])

    

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    

    return (
        <div className='trip-detail-main confirm'>
            <h2 className='trip-detail-head'>Great, You're Booked!</h2>
            <h4 className='confirmation-num'>A confirmation email is on its way to you.</h4>
            <h6 className='confirmation-num'>Confirmation number: {getRandomArbitrary(565565679944233, 100555616446555843632)}</h6>

            <div className='trip-info-modal'>
                <img className="trip-image-small modal" 
                src={`${allSpots[spotId]?.Images[0]?.url}`} alt="spot" 
                onError={(e) => { e.target.src = 'https://sonuptraders.com/wp-content/uploads/2019/02/picture-not-available.jpg'; e.target.onError = null; }}/>
                <div>

                    <h4 className='trip-detail-h4'>Address</h4>
                    <p className='trip-modal-p'>{allSpots[spotId]?.address}</p>
                    <p className='trip-modal-p'>{allSpots[spotId]?.city}, {allSpots[spotId]?.state} {allSpots[spotId]?.zipCode}</p> 
                </div>

            </div>
            <div className='booking-line light'></div>

            <div>
                <h4 className='trip-detail-h4'>Cabin details</h4>
                <p className='trip-modal-p'>{allSpots[spotId]?.title}</p>
                <p className='trip-modal-p'>Hosted by {allUsers[allSpots[spotId]?.userId]?.username}</p> 
            </div>

            <div className='booking-line light'></div>

            <div>
                <h4 className='trip-detail-h4'>Travel Dates</h4>
               {currBooking &&
                <p className='trip-modal-p'>{dateFormatOrder(new Date(currBooking?.startDate), new Date(new Date(currBooking?.endDate)))}</p>
               }
            </div>

            <div className='booking-line light'></div>

            <div>
                <h4 className='trip-detail-h4'>Billing Summary</h4>
                <p className='trip-modal-p'>Guest count: {currBooking?.guestCount} {currBooking?.guestCount === 1 ? `guest` : `guests`}</p>
                <p className='trip-modal-p'>Price / night: {`$${allSpots[spotId]?.price}`} x {dayCount(currBooking?.startDate, currBooking?.endDate)} {dayCount(currBooking?.startDate, currBooking?.endDate) === 1 ? "night" : "nights"}</p>
                <p className='trip-modal-p'>Sales tax: {`$${Number.parseFloat(allSpots[spotId]?.price * 0.092).toFixed(2)}`}</p>

                <div className='booking-line light'></div>

                <p className='total-price last new'>Total: {`$${allSpots[spotId]?.price * dayCount(currBooking?.startDate, currBooking?.endDate) + +Number.parseFloat(allSpots[spotId]?.price * 0.092).toFixed(2)}`}</p>
            </div>

        </div>
    )
}

export default BookingConfirmation