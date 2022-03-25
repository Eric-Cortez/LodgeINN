import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import { addBooking, getAllBookings } from '../../store/booking';
import { useDispatch, useSelector, } from 'react-redux';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router-dom';
import "./BookingDetails.css"
import { disableCustomDt, dayCount, handleDisabledDatesInRange } from '../utils';
import { avgStars } from '../utils';
import { getAllSpots } from '../../store/spots';
import LoginFormModal from "../../context/LoginFormModal"
import Demo from "../Navigation/Demo.js"


const BookingDetails = ({ spotId, user, allSpotReviews }) => {

    const dispatch = useDispatch()
    const history = useHistory()


    const customSelect = (guestLimit) => {
        const limitArr = []
        for (let i = 1; i <= guestLimit; i++) {
            limitArr.push(i)
        }
        return limitArr
    }

    const allBookings = useSelector(state => state?.booking?.list)
    const spot = useSelector(state => state?.spots[spotId])
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [guestCount, setGuestCount] = useState(customSelect(spot?.guests)[0])
    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])
    const spotBookings = allBookings?.filter(booking => booking?.spotId === +spotId)
    const sessionUser = useSelector(state => state?.session?.user)



    useEffect(() => {
        dispatch(getAllBookings())
        dispatch(getAllSpots())

    }, [guestCount, startDate, endDate, dispatch]);

    useEffect(() => {
        const errors = [];
        if (startDate === "") errors.push("Please select a check-in date")
        if (endDate === "") errors.push("Please Select a checkout date")
            setErrors(errors)
    }, [startDate, endDate])


    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload;

            payload = {
               spotId: +spotId,
               userId: user?.id,
               startDate: startDate,
               endDate: endDate,
               guestCount: +guestCount
           }

        let res;
        if (errors && errors.length === 0) {
            res = await dispatch(addBooking(payload))
        } else {
            setDisplayErrors(true)
        }

        if (res) {
            history.push(`/users/${user?.id}/trips`)
        }
    }

    handleDisabledDatesInRange(startDate, endDate, spotBookings, setStartDate, setEndDate)

    return (
        <div className='booking-div'>
            <div className='upper-booking-detail-div'>

                <span id="one-price"><h3 className='price-per-n'>{`$${spot?.price}`}</h3> <span className='per-night-label'>/ night</span></span>

                {allSpotReviews &&

                    <span className='booking-reviews-count'><i className="fas fa-star"></i> {allSpotReviews.length ? avgStars(allSpotReviews) : ""}  · {allSpotReviews?.length} {allSpotReviews?.length === 1 ? 'review' : 'reviews'}</span>
                }


            </div>
            <div className='each-error-div'>
                { displayErrors && errors?.map((error, ind) => (
                    <div className="each-error-div" key={ind}>{`* ${error}`}</div>
                ))}
            </div>
            <form className='booking-form' onSubmit={handleSubmit}>
                <div id="booked-msg"></div>
                {sessionUser &&
                    <>
                        <div className='date-picker-div'>
                            <DatePicker
                                id="date-start-input"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                placeholderText='Check-in date'
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
                                placeholderText='Check-out date'
                                startDate={startDate}
                                endDate={endDate}
                                excludeDates={disableCustomDt(spotBookings)}
                                minDate={new Date(startDate).setDate(new Date(startDate).getDate() + 1)}
                            />
                        </div>
                        <select
                            onChange={e => setGuestCount(e.target.value)}
                            className="guest-count-select"
                            value={guestCount}
                        >
                            {customSelect(spot?.guests)?.map(num => {
                                if (num === 1) {
                                    return <option key={num} value={num}>{num} guest</option>
                                } else {

                                    return <option key={num} value={num}>{num} guests</option>
                                }
                            })}

                        </select>
                    </>}


                {sessionUser &&
                        <button className='reserve-booking-btn'>{startDate === "" && endDate === "" ? "Check availability" : "Reserve"}</button>
                }
                {endDate ? <div>
                    {/* <h5 className='reserve-msg'>You won't be charged yet</h5> */}
                    <h4 className='total-price heading'>Booking detail</h4>
                    {console.log(guestCount)}
                    {guestCount && 
                    <p className='total-price'>Guest count: ({`${guestCount}`} { guestCount === 1 ? `guest` : `guests`} ) </p>
                    }
                    <p className='total-price'>Price / night:{`$${spot?.price}`} x {dayCount(startDate, endDate) === 1 ? `${dayCount(startDate, endDate)} night` : `${dayCount(startDate, endDate)} nights`} </p>
                    <p className='total-price'>Sales tax: {`$${Number.parseFloat(spot?.price * 0.092).toFixed(2)}`}</p>
                    
                    <div className='booking-line'></div>
                    <p className='total-price last'>Total: {`$${spot?.price * dayCount(startDate, endDate) + +Number.parseFloat(spot?.price * 0.092).toFixed(2)}`}</p>
                </div> : ""}
            </form>
                {!sessionUser &&
                    <>
                        <p className='to-login-msg'>Want to reserve a cabin?</p>
                        <div className='login-demo-div'>
                        <LoginFormModal />
                         <p className='or'> or </p>
                        <Demo />
                        </div>
                    </>
                }
        </div>
    )
}

export default BookingDetails;