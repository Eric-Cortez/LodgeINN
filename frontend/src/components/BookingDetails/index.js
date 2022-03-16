import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker"
import moment from 'moment';
import { addBooking, getAllBookings } from '../../store/booking';
import { useDispatch, useSelector, } from 'react-redux';
import { addDays } from 'date-fns';
import { useHistory } from 'react-router-dom';




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
    }, [guestCount]);

    const dateFormat = (currDate) => {
        // let currDate = new Date(curr.startDate)
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
            const convertStart = dateFormat(startBookingDate)
            convertEnd = dateFormat(endBookingDate)

            const dayInMilliseconds = 86400000 
            let j = startBookingDate.getTime() 
            while (j < endBookingDate.getTime()) {
                const currNewDate = new Date(j)
                const convert = dateFormat(currNewDate)

                disableDateArr.push(addDays(new Date(convert), 1))
                j += dayInMilliseconds; 
            }



            // const difference = endBookingDate.getTime() - startBookingDate.getTime() 
            // const days = Math.ceil(difference / (1000 * 3600 * 24));
            // if(days === 2) {
            //     disableDateArr.push(addDays(new Date(convertStart), 1))
            //     disableDateArr.push(addDays(new Date(convertEnd), 1))
            // }

            
        }
        if (!disableDateArr.includes(addDays(new Date(convertEnd), 1))){
            disableDateArr.push(addDays(new Date(convertEnd), 1))
        }
        return disableDateArr
        // return !customDates.includes(current.format('YYYY-MM-DD'));

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
        console.log(res)
        
        history.push("/")
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    excludeDates={disableCustomDt(spotBookings)}
                    // excludeDates={[addDays(new Date("2022-03-30"), 1)]}
                // dateFormat="MM/dd/yyyy"
                // excludeDates={customDates}
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    placeholderText='Add date'
                    startDate={startDate}
                    endDate={endDate}
                    // dateFormat="MM/dd/yyyy"
                    excludeDates={disableCustomDt(spotBookings)}
                    minDate={startDate}
                />
                <select
                    onChange={e => setGuestCount(e.target.value)}
                >
                    {guestLimit.map(num => (
                        <option value={num}>{num}</option>
                    ))}

                </select>
                <button>Submit</button>
            </form>
        </>
    )
}

export default BookingDetails;