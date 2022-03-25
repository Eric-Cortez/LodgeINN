const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Booking } = require('../../db/models');
const router = express.Router();


// USE FOR VALIDATIONS LATER 
const bookingForm = [
    check('startDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please select a check-in date.'),
    check('endDate')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage(' Please Select a checkout date.'),
    check('guestCount')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage(' Please select a valid guest count.'), 
    handleValidationErrors,
];

// GET ALL BOOKINGS 
router.get("/", asyncHandler(async (req, res) => {
    const bookings = await Booking.findAll({
        order: [["startDate", "ASC"]]
    })
    return res.json(bookings)
}))


// POST BOOKING 
router.post("/",
    requireAuth,
    bookingForm,
    asyncHandler(async (req, res) => {
        // const {spotId, userId, startDate, endDate, guestCount} = req.body
        const booking = await Booking.create(req.body)
        return res.json(booking)
    }))

// UPDATE BOOKING 
router.put("/:bookingId",
requireAuth, 
asyncHandler(async (req, res) => {
    const bookingId = parseInt(req.params.bookingId, 10)
    const currBooking = await Booking.findByPk(bookingId)
    // const { spotId, userId, startDate, endDate, guestCount } = req.body
    const updatedBooking = await currBooking.update(req.body)
    return res.json({
        updatedBooking
    })
}))


// DELETE BOOKING 
router.delete("/:bookingId",
requireAuth,
asyncHandler(async (req, res) => {
    const bookingId = parseInt(req.params.bookingId, 10);
    const currBooking = await Booking.findByPk(bookingId);
    await currBooking.destroy()
    
    res.json({message: "Delete Successful", id: currBooking.id})
}))



module.exports = router;