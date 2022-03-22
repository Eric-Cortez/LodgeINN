const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, User} = require('../../db/models');
const router = express.Router();

const reviewForm = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ max: 255 })
        .withMessage("Review must be less 255 characters"),
    handleValidationErrors,
];





// GET all reviews one spot 
router.get("/:id", asyncHandler(async (req, res) => {
    const spotId = parseInt(req.params.id, 10)
    
    const reviews = await Review.findAll({
       where: {
           spotId
       } , 
       include: [User],
        order: [['createdAt', 'ASC']]
       // limit: 5
  })

    return res.json(reviews)
}))

// POST a new review on a spot 
router.post('/',
    requireAuth,
    reviewForm,
    asyncHandler(async (req, res) => {
        // const spotId = parseInt(req.params.id, 10)
        const { userId, spotId, rating, review } = req.body
        const newReview = await Review.create({
            userId,
            spotId,
            rating, 
            review
        })

        return res.json({
            newReview
        })
    }))



router.put('/:id',
    requireAuth,
    reviewForm,
    asyncHandler(async (req, res) => {
        
        const reviewId = parseInt(req.params.id, 10);
        const currReview = await Review.findByPk(reviewId);
        
        const { rating, review} = req.body
        
        const newReview = {
            id: reviewId,
            rating,
            review
        }
        const updatedReview = await currReview.update(newReview)
        console.log(updatedReview)
        return res.json({
            updatedReview
        })
    }))


router.delete('/:id', 
asyncHandler(async (req, res) => {
    const reviewId = parseInt(req.params.id, 10);
    const currReview = await Review.findByPk(reviewId)
    await currReview.destroy()
  
    res.json({ message: "Delete Successful", id: currReview.id });
}));

module.exports = router;