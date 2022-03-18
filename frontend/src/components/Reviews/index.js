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
    <div>
     

     <div className='all-reviews-div'>
      {allSpotReviews && allSpotReviews?.map(eachReview => (
        <div className='each-review-div' key={eachReview?.id}>
          <div className='review-user-info'>
            <img className='profile-img-review' src={"https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"} />
            <div className='username-date-div-review'>
              <p className='username-review'>{eachReview?.User?.username} </p>
              <p className='date-review'>{formatDateMonthYear(eachReview?.updatedAt)}</p>
            </div>
          </div>
          <Rating 
          className="react-simple-star-rating"
          ratingValue={eachReview?.rating * 20} 
          fillColor={"#ff385c"}
          readonly={true}/>
          <p>{eachReview?.review}</p>
          <button id="post-modal-del" onClick={handleDelete(eachReview?.id)}><i className="fa fa-trash"></i></button>
          <EditReviewModal reviewId={eachReview?.id} spotId={spot?.id}/>
        </div>
      ))}
      </div>
      <div>
        <AddReviewForm spotId={spot?.id} userId={user?.id}/>
      </div>

    </div>
  )
}
