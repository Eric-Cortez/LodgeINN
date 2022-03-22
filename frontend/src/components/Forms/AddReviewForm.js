
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'
import "./GlobalForm.css"
import { addReview, getAllReviews } from '../../store/reviews';


const AddReviewForm = ({ spotId, userId }) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [errors, setErrors] = useState([])
    const [displayErrors, setDisplayErrors] = useState(false);
    const [rating, setRating] = useState(0)
    const [content, setContent] = useState('')
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        const errors = []
        if (content === " " || content === "  ") errors.push("Please provide content for your review")
        if (content.length > 255) errors.push("Review must be less than 255 characters")
        setErrors(errors)
    }, [content])

    let review;
    const onSubmit = async (e) => {
        e.preventDefault()
     
        const payload = {
            userId,
            spotId,
            rating: rating / 20,
            review: content,
        }
        
        if(errors && errors.length === 0){
           review = await dispatch(addReview(payload))
        }else {
           setDisplayErrors(true);
        }
        if (review) {
            await dispatch(getAllReviews(spotId))
            setRating(0)
            setContent("")
        }
    }

    const updateContent = (e) => {
        setContent(e.target.value)
    }

    const handleRating = (e) => {
        setRating(e)
    }

    return (
        <div id="reivew-product-div">
            <h3 className='write-review-title'>Write a review</h3>
            <form className="style-form" onSubmit={onSubmit}>
                <div className='error-div-reviews'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div className='each-error-div-reviews' key={ind} >{`* ${error}`}</div>
                    ))}
                </div>
                <div className='App'>
                    <p className='input-label-rating'>Overall rating</p>
                    <Rating 
                    fillColor={"#ff385c"}
                    onClick={handleRating} 
                    ratingValue={rating} />
                </div>
                <div className='input-div'>
                    <label className='input-label'>Add a written review</label>
                    <textarea
                        className='add-review-text'
                        placeholder='Add a review...'
                        type='text'
                        name='content'
                        required
                        onChange={updateContent}
                        value={content}
                    ></textarea>
                </div>
                <div id="">

                </div>
                <div className='submit-btn-div-add-review'>
                    <button
                        className="submit-btn-add-review"
                        // disabled={errors.length > 0}
                        type='submit'> Submit </button>
                </div>
            </form>
        </div>
    )
}

export default AddReviewForm;
