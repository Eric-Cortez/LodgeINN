const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, Amenity, User } = require('../../db/models');
const router = express.Router();

const spotHostForm = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ max: 255 })
        .withMessage("Address must be less 255 characters"),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ max: 255 })
        .withMessage("City must be less 255 characters"),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("City must be less 255 characters"),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Country must be less 50 characters"),
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage("Title must be less 100 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a description"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a price per night"),
    check('zipCode')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid zip code"),
    check('guests')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid zip code"),
    check('bedrooms')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid zip code"),
    check('bathrooms')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid zip code"),
    check('url')
        .exists({ checkFalsy: true })
        .isLength({ max: 255 })
        .withMessage("Please provide a valid zip code"),
];



// GET  SPOTS - all the spots 
router.get("/", asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        include: [Image, Amenity],
        limit: 15
    })
    // console.log(spots[0].Images[0].url)
    res.json(spots);
}))

// GET one spot 
router.get("/:id", asyncHandler(async (req, res) => {
    const spotId = parseInt(req.params.id, 10)
    const spot = await Spot.findByPk(spotId, {
        include: [Image, Amenity, User]
    })
    return res.json(spot)
}))


// router.get('/host', asyncHandler(async (req, res) => {
//     return res.send('cabin form')
// }))

router.post('/host', 
 requireAuth, 
 spotHostForm,
 asyncHandler(async (req, res) => {

     const { image, spots, amenities } = req.body
    const id = await Spot.create(spots)
    
    const newImageUrl = {
        spotId: id.id,
        url: image.url
    }
    await Image.create(newImageUrl)
    const newAmenityList = {
        spotId: id.id,
        kitchen: amenities.kitchen,
        privateBeachAccess: amenities.privateBeachAccess,
        firePlace: amenities.firePlace,
        parking: amenities.parking,
        pool: amenities.pool,
        hotTub: amenities.hotTub,
        pets: amenities.pets,
    }
    
    await Amenity.create(newAmenityList)

    // await setTokenCookie(res, id);
    return res.json({
        id
    })
}))

router.post('/host',
    requireAuth,
    spotHostForm,
    asyncHandler(async (req, res) => {

        const { image, spots, amenities } = req.body
        const id = await Spot.create(spots)

        const newImageUrl = {
            spotId: id.id,
            url: image.url
        }
        await Image.create(newImageUrl)
        const newAmenityList = {
            spotId: id.id,
            kitchen: amenities.kitchen,
            privateBeachAccess: amenities.privateBeachAccess,
            firePlace: amenities.firePlace,
            parking: amenities.parking,
            pool: amenities.pool,
            hotTub: amenities.hotTub,
            pets: amenities.pets,
        }

        await Amenity.create(newAmenityList)

        // await setTokenCookie(res, id);
        return res.json({
            id
        })
    }))



module.exports = router;