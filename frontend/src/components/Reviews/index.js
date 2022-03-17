import React,{ useEffect, useState } from 'react'
import { getAllReviews } from '../../store/reviews'
import { useSelector, useDispatch, } from 'react-redux';
import "./Reviews.css"
import AddReviewForm from '../Forms/AddReviewForm';
import EditReviewModal from '../../context/EditReviewModal';


export const Reviews = ({spot, user}) => {

  const dispatch = useDispatch()
  const allSpotReviews = useSelector(state => state?.reviews?.list)

  useEffect(() => {
    if(spot?.id){
      dispatch(getAllReviews(spot?.id))
    }
  }, [spot?.id, dispatch])
  
  return (
    <div className='each-review-div'>
      {allSpotReviews && allSpotReviews?.map(eachReview => (
        <div key={eachReview?.id}>
          <p>User: {eachReview?.User?.username}</p>
          <p>Date: {eachReview?.updatedAt}</p>
          <p>Review: {eachReview?.review}</p>
          <EditReviewModal reviewId={eachReview?.id} spotId={spot?.id}/>
        </div>
      ))}
      <div>
        <AddReviewForm spotId={spot?.id} userId={user?.id}/>
      </div>

    </div>
  )
}
