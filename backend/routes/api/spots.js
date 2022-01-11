const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, Image, Amenity } = require('../../db/models');
const router = express.Router();

`   `
// USE FOR VALIDATIONS LATER 
// const validateLogin = [
//     check('credential')
//         .exists({ checkFalsy: true })
//         .notEmpty()
//         .withMessage('Please provide a valid email or username.'),
//     check('password')
//         .exists({ checkFalsy: true })
//         .withMessage('Please provide a password.'),
//     handleValidationErrors,
// ];


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
        include: [Image, Amenity]
    })
    return res.json(spot)
}))


// router.get('/host', asyncHandler(async (req, res) => {
//     return res.send('cabin form')
// }))

router.post('/host', 
 requireAuth, 
 asyncHandler(async (req, res) => {

    const { image, spots } = req.body
    const id = await Spot.create(spots)
    
    const newImageUrl = {
        spotId: id.id,
        url: image.url
    }
    await Image.create(newImageUrl)
    

    // await setTokenCookie(res, id);
    return res.json({
        id
    })
}))



module.exports = router;