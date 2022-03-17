
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import "./GlobalForm.css"
import { editReview, getOneReview, getAllReviews } from '../../store/reviews';


const EditReviewForm = ({ reviewId, spotId, setShowModal }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const currReview = useSelector(state => state?.reviews[reviewId])
    const [errors, setErrors] = useState([])
    const [displayErrors, setDisplayErrors] = useState(false);
    const [rating, setRating] = useState((currReview?.rating * 20))
    const [content, setContent] = useState(currReview?.review)
    console.log(currReview?.rating, "current rating from initial post")
    console.log(rating, "controled input")


    useEffect(()=>{
        if(spotId){
            dispatch(getOneReview(spotId))
        }
    }, [dispatch, rating])
    useEffect(() => {
        const errors = []
        if (content === " " || content === "  ") errors.push("Please provide content for your review")
        setErrors(errors)
    }, [content])

    let review;
    const onSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            rating: rating / 20,
            review: content,
        }
        if (errors && errors.length === 0) {
            review = await dispatch(editReview(payload, reviewId))
            setShowModal(false)
        } else {
            setDisplayErrors(true);
        }
        if (review) {
            await dispatch(getAllReviews(spotId))
            // setRating(0)
            // setContent("")
        }
    }

   

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    const handleRating = (e) => {
        setRating(e)
        // other logic
    }

    return (
        <div id="reivew-product-div">
            <form className="style-form" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <div className='App'>
                    <Rating
                        onClick={handleRating}
                        ratingValue={rating} />
                </div>
                <h2 id="form-h2">Edit Review</h2>
                <div className='input-div'>
                    <textarea
                        className='text-area'
                        type='text'
                        name='content'
                        required
                        onChange={updateContent}
                        value={content}
                    ></textarea>
                </div>
                <div id="">

                </div>
                <div className='submit-btn-div'>
                    <button
                        className="submit-btn"
                        // disabled={errors.length > 0}
                        type='submit'> Submit </button>
                </div>
            </form>
        </div>
    )
}

export default EditReviewForm;
