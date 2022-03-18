
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
        setErrors(errors)
    }, [content])

    let review;
    const onSubmit = async (e) => {
        e.preventDefault()
        console.log(rating, "rating")
     
        const payload = {
            userId,
            spotId,
            rating: rating / 20,
            review: content,
        }
        
        console.log(payload)
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
            <h1>Create Review</h1>
            <form className="style-form" onSubmit={onSubmit}>
                <div className='each-error-div'>
                    {displayErrors && errors?.map((error, ind) => (
                        <div key={ind}>{`* ${error}`}</div>
                    ))}
                </div>
                <div className='App'>
                    <p>Overall rating</p>
                    <Rating 
                    fillColor={"#ff385c"}
                    onClick={handleRating} 
                    ratingValue={rating} />
                </div>
                <h2 id="form-h2">Add a written review</h2>
                <div className='input-div'>
                    {/* <label className='input-label required-field'>Content </label> */}
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

export default AddReviewForm;
