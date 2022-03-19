import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import moment from 'moment';
import bookingReducer, { addBooking, getAllBookings } from '../../store/booking';
import { useDispatch, useSelector, } from 'react-redux';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router-dom';
import "./BookingDetails.css"
import { dateFormat, disableCustomDt, customSelect, dayCount, handleDisabledDatesInRange } from '../utils';
import { avgStars } from '../utils';


const BookingDetails = ({ spotId, spot, user, allSpotReviews }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // format todays date 
    // let today = new Date();
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = today.getFullYear();
    // today = yyyy + '/' + mm + '/' + dd
    // const yesterday = new Date(new Date(today).setDate(new Date(today).getDate() - 1))

  
    const guestLimit = customSelect(spot?.guests)
    const allBookings = useSelector(state => state?.booking?.list)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guestCount, setGuestCount] = useState(guestLimit[0])
    const spotBookings = allBookings.filter(booking => booking.spotId === +spotId)

    useEffect(() => {
        dispatch(getAllBookings())
    }, [guestCount, startDate, endDate, dispatch]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            spotId: +spotId,
            userId: user.id,
            startDate: startDate,
            endDate: endDate,
            guestCount: +guestCount
        }
        const res = await dispatch(addBooking(payload))
        history.push(`/`)
    }

 
   handleDisabledDatesInRange(startDate,endDate, spotBookings, setStartDate, setEndDate)

    return (
        <div className='booking-div'>
            <div className='upper-booking-detail-div'>
        
                <span id="one-price"><h3 className='price-per-n'>{`$${spot?.price}`}</h3> <span className='per-night-label'>/ night</span></span>
                
                {allSpotReviews &&
                <span className='booking-reviews-count'><i className="fas fa-star"></i> {avgStars(allSpotReviews)} · {allSpotReviews?.length} {allSpotReviews?.length === 1 ? 'review' : 'reviews'}</span>
                }   
            
            
            </div>
            <form className='booking-form' onSubmit={handleSubmit}>
                <div id="booked-msg">

                </div> 
                <div className='date-picker-div'>
                <DatePicker
                    id="date-start-input"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    placeholderText='Add date'
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    excludeDates={disableCustomDt(spotBookings)}
                    />
                <DatePicker
                    id="date-end-input"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    placeholderText='Add date'
                    startDate={startDate}
                    endDate={endDate}
                    excludeDates={disableCustomDt(spotBookings)}
                        minDate={new Date(startDate).setDate(new Date(startDate).getDate() + 1) }
                    />     
                </div>
                <select
                    onChange={e => setGuestCount(e.target.value)}
                    className="guest-count-select"
                    >
                    {guestLimit.map(num => {
                        if(num === 1) {
                            return   <option key={num} value={num}>{num} guest</option>
                        } else {

                           return  <option key={num} value={num}>{num} guests</option>
                        }
                    })}

                </select>
                <button className='reserve-booking-btn'>Reserve</button>
                {endDate ? <div>
                <h5 className='reserve-msg'>You won't be charged yet</h5>
                <p className='total-price'>{`$${spot?.price}`} x {dayCount(startDate, endDate) === 1 ? `${dayCount(startDate, endDate)} night` : `${dayCount(startDate, endDate)} nights`}   </p>
                <div className='booking-line'></div>
                <p className='total-price last'>Total before taxes: {`$${spot?.price * dayCount(startDate, endDate)}`}</p>
                </div>: ""}
            </form>
        </div>
    )
}

export default BookingDetails;