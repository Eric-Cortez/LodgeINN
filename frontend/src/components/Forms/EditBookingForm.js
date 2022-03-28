import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import {  getAllBookings } from '../../store/booking';
import { useDispatch, useSelector, } from 'react-redux';
import { addDays } from 'date-fns';
import { dateFormat, customSelect, dayCount} from '../utils';
import { editBooking } from '../../store/booking';


const EditBookingForm = ({ setShowModal, spotId, booking}) => {
    const dispatch = useDispatch()

    const spot = useSelector(state => state?.spots[spotId])
    const guestLimit = customSelect(spot?.guests)
    const allBookings = useSelector(state => state?.booking?.list)
    const [startDate, setStartDate] = useState(new Date(booking?.startDate));
    const [endDate, setEndDate] = useState(new Date(booking?.endDate));
    const [guestCount, setGuestCount] = useState(booking?.guestCount)
    const [displayErrors, setDisplayErrors] = useState(false)
    const [errors, setErrors] = useState([])
    const spotBookings = allBookings.filter(booking => booking.spotId === +spotId)
   
    useEffect(() => {
        dispatch(getAllBookings())
    }, [guestCount, startDate, endDate, dispatch]);

    useEffect(() => {
       
        const errors = [];
        if (!startDate) errors.push("Please select a check-in date")
        if (!endDate) errors.push("Please Select a checkout date")
        setErrors(errors)
    }, [startDate, endDate])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (new Date(endDate).getTime() < new Date(startDate).getTime()) {
            setEndDate("")
            errors.push("Please select a later checkout date")
        }


        const payload = {
            startDate: startDate,
            endDate: endDate,
            guestCount: +guestCount
        }
      
        let res;
        if (errors && errors.length === 0) {
            res = await dispatch(editBooking(payload, booking?.id))
        } else {
            setDisplayErrors(true)
        }
        if (res) {
            await dispatch(getAllBookings())
           setShowModal(false)
        }
    }


    const disableDatesEdit = spotBookings => {
        const filteredEdit = spotBookings.filter(spot => spot.id !== booking.id)
        let disableDateArr = []

        for (let i = 0; i < filteredEdit.length; i++) {
            const startBookingDate = new Date(filteredEdit[i].startDate)
            const endBookingDate = new Date(filteredEdit[i].endDate)

            let j = startBookingDate.getTime()
            while (j <= endBookingDate.getTime()) {

                const convert = dateFormat(new Date(j))
                disableDateArr.push(addDays(new Date(convert), 1))

                const result = new Date(j)
                j = result.setDate(result.getDate() + 1);
            }
        }

        return disableDateArr;

    }
    

  return (
      <div className='booking-div edit'>
          <div className='upper-booking-detail-div'>
            <div>

            </div>

            <span id="one-price">
                  <h3 className='price-per-n'>Edit Booking</h3>
            </span>
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
                      excludeDates={disableDatesEdit(spotBookings) }
                  />
                  <DatePicker
                      id="date-end-input"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      placeholderText='Check-out date'
                      startDate={startDate}
                      endDate={endDate}
                      excludeDates={disableDatesEdit(spotBookings)}
                      minDate={new Date(startDate).setDate(new Date(startDate).getDate() + 1)}
                  />
              </div>
              <select
                  onChange={e => setGuestCount(e.target.value)}
                  value={guestCount}
                  className="guest-count-select"
              >
                  {/* <option style={{ display: "none"}}>{booking?.guestCount} guests</option>  */}
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
                  <p className='total-price'>Price / night: {`$${spot?.price}`} x {dayCount(startDate, endDate) === 1 ? `${dayCount(startDate, endDate)} night` : `${dayCount(startDate, endDate)} nights`} ( {`${guestCount}`} {guestCount === 1 ? `guest` : `guests`} )</p>
                  <p className='total-price'>Sales tax: {`$${Number.parseFloat(spot?.price * 0.092).toFixed(2)}`}</p>
                  <div className='booking-line'></div>
                  <p className='total-price last'>Total: {`$${spot?.price * dayCount(startDate, endDate) + +Number.parseFloat(spot?.price * 0.092).toFixed(2)}`}</p>
              </div> : ""}
          </form>
      </div>
  )
}

export default EditBookingForm