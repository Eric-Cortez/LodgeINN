import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews } from "../../store/reviews"
import { avgStars } from '../utils'

const Ratings = ({ spot }) => {
    const dispatch = useDispatch()

    const allReviews = useSelector(state => state?.reviews)
    const reviewsArr = Object.values(allReviews)
    const reviewsSpot = reviewsArr.filter(review => review.spotId === spot?.id)

    useEffect(() => {
        dispatch(getAllReviews(spot?.id))
    }, [dispatch])
    return (
        <>

            {reviewsSpot.length > 0 &&
                <i className="fas fa-star spot"></i>
            }
          
            {avgStars(reviewsSpot) === "0.0" ?
                <div>0</div> :
                <div>{reviewsSpot.length ? avgStars(reviewsSpot) : ""}</div>
            }
        </>
    )
}

export default Ratings