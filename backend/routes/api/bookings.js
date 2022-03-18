const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking } = require('../../db/models');
const router = express.Router();


// USE FOR VALIDATIONS LATER 
const bookingForm = [
    // check('credential')
    //     .exists({ checkFalsy: true })
    //     .notEmpty()
    //     .withMessage('Please provide a valid email or username.'),
    // check('password')
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide a password.'),
    // handleValidationErrors,
];

// GET ALL BOOKINGS 
router.get("/", asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll()
    return res.json(bookings)
}))


// POST BOOKING 
router.post("/",
    requireAuth,
    bookingForm,
    asyncHandler(async (req, res) => {
        const {spotId, userId, startDate, endDate, guestCount} = req.body
        const booking = await Booking.create(req.body)
        return res.json(booking)
    }))




module.exports = router;