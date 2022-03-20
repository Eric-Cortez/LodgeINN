import React, { useEffect } from 'react'
import "./TripPage.css"
import { getAllBookings } from '../../store/booking'
import { useSelector, useDispatch } from 'react-redux';

const TripPage = () => {
  const sessionUser = useSelector(state => state?.session?.user);
  const dispatch = useDispatch()
  const allBookings = useSelector(state => state?.booking?.list)

  
 const userBookings = allBookings.filter(booking =>  booking?.userId === sessionUser?.id)


  useEffect(() => {
    dispatch(getAllBookings())
  }, [dispatch])


  return (
    <div className='trip-page-main'>
      <h2>TripPage</h2>
      {userBookings && userBookings.map(booking => (
        <div key={booking?.id}>{booking?.startDate} spot: {booking?.spotId}</div>

      ))}
      <h4>Upcoming trips</h4>
      <h4>Where you've been</h4>
    </div>
  )
}

export default TripPage;