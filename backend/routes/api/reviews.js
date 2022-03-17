const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, User} = require('../../db/models');
const router = express.Router();

const reviewForm = [
    // check('spots.address')
    //     .exists({ checkFalsy: true })
    //     .isLength({ max: 255 })
    //     .withMessage("Address must be less 255 characters"),
    // check('spots.city')
    //     .exists({ checkFalsy: true })
    //     .isLength({ max: 255 })
    //     .withMessage("City must be less 255 characters"),
    // check('spots.state')
    //     .exists({ checkFalsy: true })
    //     .isLength({ max: 50 })
    //     .withMessage("City must be less 255 characters"),
    // check('spots.country')
    //     .exists({ checkFalsy: true })
    //     .isLength({ max: 50 })
    //     .withMessage("Country must be less 50 characters"),
    // check('spots.title')
    //     .exists({ checkFalsy: true })
    //     .isLength({ max: 100 })
    //     .withMessage("Title must be less 100 characters"),
    // check('spots.description')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Please provide a description"),
    // check('spots.price')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Please provide a price per night"),
    // check('spots.zipCode')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Please provide a valid zip code"),
    // check('spots.guests')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Please provide a valid number of guests"),
    // check('spots.bedrooms')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Please provide a valid number of bedrooms"),
    // check('spots.bathrooms')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Please provide a valid number of bathrooms"),
    // check('image.url')
    //     .exists({ checkFalsy: true })
    //     .isLength({ max: 255 })
    //     .withMessage("Please provide a valid url"),
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



// router.put('/:id/host',
//     requireAuth,
//     spotHostForm,
//     asyncHandler(async (req, res) => {

//         const spotId = parseInt(req.params.id, 10);
//         const currSpot = await Spot.findByPk(spotId);

//         const { image, spots, amenities } = req.body
//         // update spot
//         const id = await currSpot.update(spots)

//         //  update image
//         const newImageUrl = {
//             id: image.id,
//             spotId: id.id,
//             url: image.url
//         }

//         const currImage = await Image.findByPk(image.id);

//         await currImage.update(newImageUrl)

//         // update amenity
//         const newAmenityList = {
//             id: amenities.id,
//             spotId: id.id,
//             kitchen: amenities.kitchen,
//             privateBeachAccess: amenities.privateBeachAccess,
//             firePlace: amenities.firePlace,
//             parking: amenities.parking,
//             pool: amenities.pool,
//             hotTub: amenities.hotTub,
//             pets: amenities.pets,
//         }
//         const currAmenity = await Amenity.findByPk(amenities.id)
//         await currAmenity.update(newAmenityList);

//         return res.json({
//             id
//         })
//     }))


// router.delete('/:id', asyncHandler(async (req, res) => {
//     const { id, Images, Amenities } = req.body
//     const spotId = parseInt(req.params.id, 10);
//     const imageId = Images[0].id;
//     const amenitiesId = Amenities[0].id;

//     const currSpot = await Spot.findByPk(spotId);
//     const currImage = await Image.findByPk(imageId);
//     const currAmenity = await Amenity.findByPk(amenitiesId);

//     if (currSpot && currImage && currAmenity) {
//         await currAmenity.destroy();
//         await currImage.destroy();
//         await currSpot.destroy();

//         res.json({ message: "Delete Successful" });
//     } else {
//         console.log('unsuccessful');
//     }

//     res.json({ message: "Delete Unsuccessful" });
// }));

module.exports = router;