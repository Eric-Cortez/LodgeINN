import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import moment from 'moment';
import bookingReducer, { addBooking, getAllBookings } from '../../store/booking';
import { useDispatch, useSelector, } from 'react-redux';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router-dom';
import "./BookingDetails.css"



const BookingDetails = ({ spotId, spot, user }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    // format todays date 
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd

    const customSelect = (guestLimit) => {
        const limitArr = []
        for (let i = 1; i <= guestLimit; i++) {
            limitArr.push(i)
        }
        return limitArr
    }

    const guestLimit = customSelect(spot?.guests)
    const allBookings = useSelector(state => state?.booking?.list)
    const [startDate, setStartDate] = useState(new Date(today));
    const [endDate, setEndDate] = useState("");
    const [guestCount, setGuestCount] = useState(guestLimit[0])
    const spotBookings = allBookings.filter(booking => booking.spotId === +spotId)

    useEffect(() => {
        dispatch(getAllBookings())
    }, [guestCount, startDate, endDate, dispatch]);

    const dateFormat = (currDate) => {
        let dd = String(currDate.getDate()).padStart(2, '0');
        let mm = String(currDate.getMonth() + 1).padStart(2, '0');
        let yyyy = currDate.getFullYear();
        currDate = yyyy + '-' + mm + '-' + dd;
        return currDate;
    }

    const disableCustomDt = current => {
        let disableDateArr = []
        let convertEnd;
        for (let i = 0; i < current.length; i++) {
            const startBookingDate = new Date(current[i].startDate)
            const endBookingDate = new Date(current[i].endDate)
            // const convertStart = dateFormat(startBookingDate)
            convertEnd = dateFormat(endBookingDate)

            const dayInMilliseconds = 86400000
            let j = startBookingDate.getTime()
            while (j < endBookingDate.getTime()) {
                const currNewDate = new Date(j)
                const convert = dateFormat(currNewDate)

                disableDateArr.push(addDays(new Date(convert), 1))
                j += dayInMilliseconds;
            }


        }
        if (!disableDateArr.includes(addDays(new Date(convertEnd), 1))) {
            disableDateArr.push(addDays(new Date(convertEnd), 1))
        }
        return disableDateArr
        // return !customDates.includes(current.format('YYYY-MM-DD'));

    }

    const dayCount = (currStartDate, currEndBookingDate) => {

        const startBookingDate = new Date(currStartDate)
        const endBookingDate = new Date(currEndBookingDate)
        
        const difference = endBookingDate.getTime() - startBookingDate.getTime()
        const days = Math.ceil(difference / (1000 * 3600 * 24));
        return days
    }

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

    const handleDisabledDatesInRange = async (startDate, endDate) => {
        const arrayOfDisabledDates = disableCustomDt(spotBookings)
   
        let dateArray = []

        const dayInMilliseconds = 86400000
        let j = new Date(startDate).getTime()
        while (j < new Date(endDate).getTime()) {
            const currNewDate = new Date(j)
            const convert = dateFormat(currNewDate)

            dateArray.push(addDays(new Date(convert), 1))
            j += dayInMilliseconds;
        }

        for (let i = 1; i < dateArray.length; i++){
                    const eachDate = dateArray[i]
                   if(arrayOfDisabledDates.find(date => dateFormat(date) ===dateFormat(eachDate))) {
                    setStartDate(endDate)
                    setEndDate("")
                    const body = document.body
                    const div = document.getElementById("booked-msg")
                    div.style.color = "rgb(234, 91, 98)"
                    div.style.fontSize ="12px"
                    div.innerText = "*Dates are unavailable please select another start date."
                    setTimeout(() => {  div.remove()}, 2000);
                    break
                   }

        }
    }

   handleDisabledDatesInRange(startDate,endDate)


    return (
        <div className='booking-div'>
            <p id="one-price">{`$${spot?.price}`} <>/ night</></p>
            <p>[star rating] . [count] reviews</p>
            <form className='booking-form' onSubmit={handleSubmit}>
                <div id="booked-msg">

                </div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    excludeDates={disableCustomDt(spotBookings)}
                    />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                        setEndDate(date)
                    }}
                    selectsEnd
                    placeholderText='Add date'
                    startDate={startDate}
                    endDate={endDate}
                    excludeDates={disableCustomDt(spotBookings)}
                    minDate={startDate}
                    />
                <select
                    onChange={e => setGuestCount(e.target.value)}
                    className="guest-count-select"
                    >
                    {guestLimit.map(num => (
                        <option key={num} value={num}>{num}</option>
                        ))}

                </select>
                <button>Reserve</button>
                {endDate ? <div>
                <h6>You won't be charged yet</h6>
                <p>{`$${spot?.price}`} x {dayCount(startDate, endDate)}   total: {spot?.price * dayCount(startDate, endDate)}</p>
                </div>: ""}
            </form>
        </div>
    )
}

export default BookingDetails;