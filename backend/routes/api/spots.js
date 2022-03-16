const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, Amenity, User } = require('../../db/models');
const router = express.Router();

const spotHostForm = [
    check('spots.address')
        .exists({ checkFalsy: true })
        .isLength({ max: 255 })
        .withMessage("Address must be less 255 characters"),
    check('spots.city')
        .exists({ checkFalsy: true })
        .isLength({ max: 255 })
        .withMessage("City must be less 255 characters"),
    check('spots.state')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("City must be less 255 characters"),
    check('spots.country')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage("Country must be less 50 characters"),
    check('spots.title')
        .exists({ checkFalsy: true })
        .isLength({ max: 100 })
        .withMessage("Title must be less 100 characters"),
    check('spots.description')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a description"),
    check('spots.price')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a price per night"),
    check('spots.zipCode')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid zip code"),
    check('spots.guests')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid number of guests"),
    check('spots.bedrooms')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid number of bedrooms"),
    check('spots.bathrooms')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a valid number of bathrooms"),
    check('image.url')
        .exists({ checkFalsy: true })
        .isLength({ max: 255 })
        .withMessage("Please provide a valid url"),
    handleValidationErrors,
];



// GET  SPOTS - all the spots 
router.get("/", asyncHandler(async (req, res) => {
    const spots = await Spot.findAll({
        include: [Image, Amenity],
        // limit: 15
    })
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



router.put('/:id/host',
    requireAuth,
    spotHostForm,
    asyncHandler(async (req, res) => {

        const spotId = parseInt(req.params.id, 10);
        const currSpot = await Spot.findByPk(spotId);

        const { image, spots, amenities } = req.body
        // update spot
        const id = await currSpot.update(spots)

        //  update image
        const newImageUrl = {
            id: image.id,
            spotId: id.id,
            url: image.url
        }

        const currImage = await Image.findByPk(image.id);

        await currImage.update(newImageUrl)

        // update amenity
        const newAmenityList = {
            id: amenities.id,
            spotId: id.id,
            kitchen: amenities.kitchen,
            privateBeachAccess: amenities.privateBeachAccess,
            firePlace: amenities.firePlace,
            parking: amenities.parking,
            pool: amenities.pool,
            hotTub: amenities.hotTub,
            pets: amenities.pets,
        }
        const currAmenity = await Amenity.findByPk(amenities.id)
        await currAmenity.update(newAmenityList);

        return res.json({
            id
        })
    }))


router.delete('/:id', asyncHandler(async (req, res) => {
    const { id, Images, Amenities } = req.body
    const spotId = parseInt(req.params.id, 10);
    const imageId = Images[0].id;
    const amenitiesId = Amenities[0].id;

    const currSpot = await Spot.findByPk(spotId);
    const currImage = await Image.findByPk(imageId);
    const currAmenity = await Amenity.findByPk(amenitiesId);

    if (currSpot && currImage && currAmenity) {
        await currAmenity.destroy();
        await currImage.destroy();
        await currSpot.destroy();

        res.json({ message: "Delete Successful" });
    } else {
        console.log('unsuccessful');
    }

    res.json({ message: "Delete Unsuccessful" });
}));

module.exports = router;