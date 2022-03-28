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

// formats date in  ---> yyyy-mm-dd
export const dateFormat = (currDate) => {
    let dd = String(currDate.getDate()).padStart(2, '0');
    let mm = String(currDate.getMonth() + 1).padStart(2, '0');
    let yyyy = currDate.getFullYear();
    currDate = yyyy + '-' + mm + '-' + dd;
    return currDate;
}

// formats date for trip detail page 
export const dateFormatOrder = (startDate , endDate) => {
    const options = { month: 'long' }
    let startmm = new Intl.DateTimeFormat('en-US', options).format(startDate);
    let startD = String(startDate.getDate()).padStart(1, '0');
    
    let endmm = new Intl.DateTimeFormat('en-US', options).format(endDate);
    let endD = String(endDate.getDate()).padStart(1, '0');
    
    let yyyy = startDate.getFullYear();

    if (startmm === endmm) {
        return startmm + ' ' + startD + "-" +  endD + ', ' + yyyy;
    } else {
        return startmm + ' ' + startD + "-" + endmm + " " + endD + ', ' + yyyy ;
    }
}

// disables dates that have already been booked for a specific spot
export const disableCustomDt = current => {
    let disableDateArr = []
    
    for (let i = 0; i < current.length; i++) {
        const startBookingDate = new Date(current[i].startDate)
        const endBookingDate = new Date(current[i].endDate)
    
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
            
            const div = document.createElement("div")
            const div2 = document.getElementById("booked-msg")
            let parentDiv = div2.parentNode
            parentDiv.insertBefore(div, div2)
            div.innerText = "* Dates are unavailable please select another start date."
            div.style.color = "white"
            div.style.backgroundColor = "rgba(229,30,80, 0.9)"
            div.style.borderRadius = "10px"
            div.style.position = "fixed"
            div.style.top = "100px"
            div.style.right = "20px"
            div.style.fontSize = "18px"
            div.style.fontWeight = "400"
            div.style.padding = "15px"
            setTimeout(() => div.remove(), 1000)
            
            
            // const div = document.getElementById("booked-msg")

            // const div = document.createElement("div")
            // const div2 = document.getElementById("booked-msg")
            // let parentDiv = div2.parentNode
            // parentDiv.insertBefore(div, div2)
            // div.innerText = "* Dates are unavailable please select another start date."
            // div.style.fontSize = "12px"
            // div.style.color = "rgb(234, 91, 98)"
            // div.style.width ="200px"
            // setTimeout(() =>  { div.remove() }, 3000);
            break
        }

    }
}

export const avgStars = (reviews) => {
    let sum = 0
    // let reviews = allSpotReviews?.list
    for (let i = 0; i < reviews?.length; i++) {
        let num = reviews[i]?.rating
        sum += num;
    }

    return `${Number.parseFloat(sum / reviews?.length).toFixed(1)}`
}


   // format todays date 
    // let today = new Date();
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = today.getFullYear();
    // today = yyyy + '/' + mm + '/' + dd
    // const yesterday = new Date(new Date(today).setDate(new Date(today).getDate() - 1))