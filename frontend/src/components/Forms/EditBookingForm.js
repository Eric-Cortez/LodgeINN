import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import moment from 'moment';
import { addBooking, getAllBookings } from '../../store/booking';
import { useDispatch, useSelector, } from 'react-redux';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router-dom';
// import "./BookingDetails.css"
import { dateFormat, disableCustomDt, customSelect, dayCount, handleDisabledDatesInRange } from '../utils';
import { avgStars } from '../utils';
import { editBooking } from '../../store/booking';


const EditBookingForm = ({ setShowModal, spotId, booking}) => {

    console.log(booking?.startDate, "form")
    const dispatch = useDispatch()
    const history = useHistory()

    const spot = useSelector(state => state?.spots[spotId])
    const guestLimit = customSelect(spot?.guests)
    const allBookings = useSelector(state => state?.booking?.list)
    const [startDate, setStartDate] = useState(new Date(booking?.startDate));
    const [endDate, setEndDate] = useState(new Date(booking?.endDate));
    const [guestCount, setGuestCount] = useState(guestLimit[0])
    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])
    const spotBookings = allBookings.filter(booking => booking.spotId === +spotId)
    console.log(startDate, endDate, "starting inputs")

    useEffect(() => {
        dispatch(getAllBookings())
    }, [guestCount, startDate, endDate, dispatch]);

    useEffect(() => {
        const errors = [];
        if (startDate === "") errors.push("Please select a check-in date")
        if (endDate === "") errors.push("Please Select a checkout date")
        setErrors(errors)
    }, [startDate, endDate])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            startDate: startDate,
            endDate: endDate,
            guestCount: +guestCount
        }
        console.log(payload, booking?.id, "COMPONENT ")
        let res;
        if (errors && errors.length === 0) {
            res = await dispatch(editBooking(payload, booking?.id))
        } else {
            setDisplayErrors(true)
        }
        console.log(res, "edit response")

        if (res) {
            await dispatch(getAllBookings())
           setShowModal(false)
        }
    }

    // handleDisabledDatesInRange(startDate, endDate, spotBookings, setStartDate, setEndDate)


  return (
      <div className='booking-div'>
          <div className='upper-booking-detail-div'>

              <span id="one-price"><h3 className='price-per-n'>Edit Booking</h3></span>


          </div>
          <div className='each-error-div'>
              {displayErrors && errors?.map((error, ind) => (
                  <div className="each-error-div" key={ind}>{`* ${error}`}</div>
              ))}
          </div>
          <form className='booking-form' onSubmit={handleSubmit}>
              <div id="booked-msg"></div>
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
                    //   excludeDates={disableCustomDt(spotBookings)}
                  />
                  <DatePicker
                      id="date-end-input"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      placeholderText='Check-out date'
                      startDate={startDate}
                      endDate={endDate}
                    //   excludeDates={disableCustomDt(spotBookings)}
                      minDate={new Date(startDate).setDate(new Date(startDate).getDate() + 1)}
                  />
              </div>
              <select
                  onChange={e => setGuestCount(e.target.value)}
                  className="guest-count-select"
              >
                  {guestLimit.map(num => {
                      if (num === 1) {
                          return <option key={num} value={num}>{num} guest</option>
                      } else {

                          return <option key={num} value={num}>{num} guests</option>
                      }
                  })}

              </select>
              <button className='reserve-booking-btn'>Update reservation</button>
              {endDate ? <div>
                  <h5 className='reserve-msg'>Booking charges</h5>
                  <p className='total-price'>{`$${spot?.price}`} x {dayCount(startDate, endDate) === 1 ? `${dayCount(startDate, endDate)} night` : `${dayCount(startDate, endDate)} nights`}   </p>
                  <div className='booking-line'></div>
                  <p className='total-price last'>Total: {`$${spot?.price * dayCount(startDate, endDate)}`}</p>
              </div> : ""}
          </form>
      </div>
  )
}

export default EditBookingForm