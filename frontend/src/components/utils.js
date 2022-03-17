import { addDays } from 'date-fns';
export const states = [
    '--Select a State--','Alabama', 'Alaska',
    'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware',
    'District of Columbia',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
    'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Maryland', 'Massachusetts', 'Michigan',
    'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska',
    'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma','Oregon', 'Pennsylvania',
    'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
]

export const dateFormat = (currDate) => {
    let dd = String(currDate.getDate()).padStart(2, '0');
    let mm = String(currDate.getMonth() + 1).padStart(2, '0');
    let yyyy = currDate.getFullYear();
    currDate = yyyy + '-' + mm + '-' + dd;
    return currDate;
}

export const disableCustomDt = current => {
    let disableDateArr = []
    let convertEnd;
    for (let i = 0; i < current.length; i++) {
        const startBookingDate = new Date(current[i].startDate)
        const endBookingDate = new Date(current[i].endDate)
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
    return disableDateArr;
}

export const customSelect = (guestLimit) => {
    const limitArr = []
    for (let i = 1; i <= guestLimit; i++) {
        limitArr.push(i)
    }
    return limitArr
}

export const dayCount = (currStartDate, currEndBookingDate) => {

    const startBookingDate = new Date(currStartDate)
    const endBookingDate = new Date(currEndBookingDate)

    const difference = endBookingDate.getTime() - startBookingDate.getTime()
    const days = Math.ceil(difference / (1000 * 3600 * 24));
    return days
}


export const handleDisabledDatesInRange = async (startDate, endDate, spotBookings, setStartDate, setEndDate) => {
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

    for (let i = 1; i < dateArray.length; i++) {
        const eachDate = dateArray[i]
        if (arrayOfDisabledDates.find(date => dateFormat(date) === dateFormat(eachDate))) {
            setStartDate(endDate)
            setEndDate("")
            const body = document.body
            const div = document.getElementById("booked-msg")
            div.innerText = "*Dates are unavailable please select another start date."
            div.style.fontSize = "12px"
            div.style.color = "rgb(234, 91, 98)"
            setTimeout(() => { div.remove() }, 2000);
            break
        }

    }
}