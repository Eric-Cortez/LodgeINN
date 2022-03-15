import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import moment from 'moment';

const BookingCalendar = () => {
    // format todays date 
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '/' + mm + '/' + dd

    // const customDates = [new Date('2022-03-30')];
    // const disableCustomDt = current => {
    //     return !customDates.includes(current.format('YYYY-MM-DD'));
    // }

    const guestLimit = [1,2,3,4,5,6,7,8,9,10]
    const [startDate, setStartDate] = useState(new Date(today));
    const [endDate, setEndDate] = useState("");
    const [guestCount, setGuestCount] = useState(guestLimit[0])
    console.log(startDate, "start")
    console.log(endDate, "enddate" )
    console.log(guestCount, "guest count")

    return (
        <>
            <form>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    // excludeDates={customDates}
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    placeholderText='Add date'
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
                <select
                    onChange={e => setGuestCount(e.target.value)}
                >
                   {guestLimit.map(num => (
                         <option value={num}>{num}</option>
                    ))} 
                   
                </select>
            </form>
        </>
    )
}

export default BookingCalendar;