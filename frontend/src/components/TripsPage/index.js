import React, { useEffect } from 'react'
import "./TripPage.css"
import { getAllBookings } from '../../store/booking'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { dateFormatOrder } from '../utils';
import { getAllSpots } from '../../store/spots';
import { getAllUsers } from "../../store/users"
import DeleteBookingBtn from './DeleteBookingBtn';
import { dateFormat } from '../utils';
import EditBookingModal from '../../context/EditBookingModal';
import { NavLink } from 'react-router-dom';

const TripPage = () => {
  const sessionUser = useSelector(state => state?.session?.user);
  const dispatch = useDispatch()
  const allBookings = useSelector(state => state?.booking?.list)
  const userBookings = allBookings?.filter(booking => booking?.userId === sessionUser?.id)
  const allSpots = useSelector(state => state?.spots)
  const allUsers = useSelector(state => state?.users)
 
  useEffect(() => {
    dispatch(getAllUsers())
    dispatch(getAllBookings())
    dispatch(getAllSpots())
  }, [dispatch])

  const futureNPastBookings = (allUserBookings) => {
    const pastDates = []
    const futureDates = []
    const todaysTrip = []
    for (let i = 0; i < allUserBookings.length; i++) {
      let current = allUserBookings[i] 
      if (dateFormat(new Date(current.startDate)) === dateFormat(new Date())) {
        todaysTrip.push([current.startDate, current, "today"])
      } else if (new Date(current.startDate).getTime() < new Date().getTime()) {
        pastDates.push([current.startDate, current])
      } 
      else {
        futureDates.push([current.startDate, current])
      }
    }

    return { pastDates: pastDates, futureDates: [ ...todaysTrip, ...futureDates] }
  }

  return (
    <div className='trip-page-main'>
    
      {/* <h2 className='trip-title'>Trips</h2> */}
      <div id="booking-delete-msg"></div>
      <div className='trips-booking-div'>
        {!futureNPastBookings(userBookings).futureDates.length ?
          <div className='left-trip-div'>
            <i className="fa fa-suitcase"></i>
            <h4>No trips booked...yet! </h4>
            <p className='no-trip-message'>Time to dust off your bags and start planning your next adventure</p>
            <Link className="trip-page-search" to="/">Start searching</Link>
          </div> :
          <div className='left-trip-div'>
            <i className="fa fa-suitcase trips"></i>
            <h4 className="upComing-trip-count">Time to pack your bags...</h4>
            <p>You have {futureNPastBookings(userBookings).futureDates.length} booked trips!</p>
          </div>}


        <div className='right-trip-div'>
          <img className='trip-page-image' src='https://images.unsplash.com/photo-1633431305705-c2438b770dbc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='trip' />
        </div>
      </div>
      <div className='trip-plans-history'>
        {/* {userBookings && userBookings.map(booking => (
              <div key={booking?.id}>{booking?.startDate} spot: {booking?.spotId}</div>
            ))} */}
        <h3>Upcoming trips</h3>
        <div className='booking-outer-container'>
          {userBookings && futureNPastBookings(userBookings).futureDates.map(date => (
            <div key={`${date[1].id}1`} className='each-booking-container'>
              <div className='booking-post-info'>
                <img className="trip-image-small" src={`${allSpots[date[1].spotId]?.Images[0]?.url}`} alt="spot" />
                <div className='content-details'>
                  <h4 className='location-title'>{allSpots[date[1].spotId]?.city}</h4>
                  <h5 className='host-title'>Hosted by {allUsers[allSpots[date[1].spotId]?.userId]?.username}</h5>
                  <p className='booking-dates'>{dateFormatOrder(new Date(date[0]), new Date(date[1]?.endDate))}</p>
                </div>
              </div>
              <div className='delete-button-div'>
                  {date[2] &&
                  <>
                    <i className="fas fa-luggage-cart"></i>
                    <p className='Check-in'>Check-in 3PM</p>
                  </>
                  }
           
                <DeleteBookingBtn bookingId={date[1]?.id} />
                <EditBookingModal spotId={date[1]?.spotId} booking={date[1]} />
            
              </div>
             
            </div>
          ))}
          {console.log(futureNPastBookings(userBookings)?.futureDates.length)}
          {futureNPastBookings(userBookings)?.futureDates.length === 0 &&
            <div className='each-booking-container'>
              <p>No upcoming trips...<NavLink className="explore-new" to="/spots">explore</NavLink></p>
            </div>}
        </div>

        <h3>Where you've been</h3>
        {userBookings && futureNPastBookings(userBookings).pastDates.map(date => (
          <div key={`${date[1].id}2`} className='each-booking-container' >
            <div className='booking-post-info'>

              <img className="trip-image-small" src={`${allSpots[date[1].spotId]?.Images[0]?.url}`} alt="spot" />
              <div className='content-details'>
                <h4 className='location-title'>{allSpots[date[1].spotId]?.city}</h4>
                <h5 className='host-title'>Hosted by {allUsers[allSpots[date[1].spotId]?.userId]?.username}</h5>
                <p className='booking-dates'>{dateFormatOrder(new Date(date[0]), new Date(date[1]?.endDate))}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default TripPage;