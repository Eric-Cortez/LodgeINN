import React,{ useEffect, useState } from 'react'
import { getAllReviews } from '../../store/reviews'
import { useSelector, useDispatch, } from 'react-redux';
import "./Reviews.css"
import AddReviewForm from '../Forms/AddReviewForm';
import EditReviewModal from '../../context/EditReviewModal';
import { deleteReview } from '../../store/reviews';
import { Rating } from 'react-simple-star-rating'

export const Reviews = ({spot, user}) => {

  const dispatch = useDispatch()
  const allSpotReviews = useSelector(state => state?.reviews?.list)

  useEffect(() => {
    if(spot?.id){
      dispatch(getAllReviews(spot?.id))
    }
  }, [spot?.id, dispatch])



  const handleDelete = (reviewId) => async (e) => {
    e.preventDefault()
    const data = await dispatch(deleteReview(reviewId));
    
    if (data && data.message === "Delete Successful") {
      await dispatch(getAllReviews(spot?.id));
    }
  }
  const formatDateMonthYear = (updatedAt) => {
    const date = new Date(updatedAt);
    const options = { month: "long"};
    const year = date.getFullYear()
    let month = date.getMonth()
    month = new Intl.DateTimeFormat('en-US', options).format(month);
 
    return `${month} ${year}`
  }
  
  return (
    <div className='each-review-div'>
      {allSpotReviews && allSpotReviews?.map(eachReview => (
        <div key={eachReview?.id}>
          <p>profile image</p>
          <p>{eachReview?.User?.username} </p>
          <p>{formatDateMonthYear(eachReview?.updatedAt)}</p>
          <Rating 
          className="react-simple-star-rating"
          ratingValue={eachReview?.rating * 20} 
          fillColor={"#ff385c"}
          readonly={true}/>
          <p>Review: {eachReview?.review}</p>
          <button id="post-modal-del" onClick={handleDelete(eachReview?.id)}><i className="fa fa-trash"></i></button>
          <EditReviewModal reviewId={eachReview?.id} spotId={spot?.id}/>
        </div>
      ))}
      <div>
        <AddReviewForm spotId={spot?.id} userId={user?.id}/>
      </div>

    </div>
  )
}
