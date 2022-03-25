import React, { useEffect } from 'react'
import "./Listings.css"
import "../../components/TripsPage/TripPage.css"
import { getAllSpots } from '../../store/spots'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddHostFormModal from '../../context/AddHostFormModal'
import EditDeleteListing from './EditDeleteListing'

const Listings = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user)
    const listings = useSelector(state => state?.spots?.list)
    const usersListings = listings.filter(listing => listing?.userId === sessionUser?.id)
    console.log(usersListings)


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])


    return (
        <div className='trip-page-main'>
            <div className='listing-host-div-btn'>
            <h2 className='trip-title listing'>Listings</h2>
                <AddHostFormModal type={"listing-page"} />
            </div>
            <div className='all-listings'>
                <h3>Your Listings</h3>
                {usersListings && usersListings.map(listing => (
                    <>
                        <div key={listing?.id} className='booking-post-info'>
                            <div className='left-listing-div'>
                                <Link to={`/spots/${listing?.id}`}>
                                    <img className="trip-image-small" src={`${listing?.Images[0]?.url}`} alt="spot" />
                                </Link>
                                <div className='content-details'>
                                    <h4 className='location-title'>{listing?.title}</h4>
                                    <h5 className='host-title'>{listing?.address} </h5>
                                    <p className='booking-dates'>{listing?.city}, {listing?.state}</p>
                                </div>
                            </div>
                            <div>
                                <EditDeleteListing oneSpot={listing} />
                            </div>
                        </div>
                        <div className='each-line'></div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Listings;