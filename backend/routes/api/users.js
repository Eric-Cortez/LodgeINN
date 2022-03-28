const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')

const router = express.Router();



const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    // check("image")
    //     .exists({ checkFalsy: true })
    //     .withMessage('Please provide an image.'),
    handleValidationErrors,
];


// SIGN UP
router.post(
    '/',
    singleMulterUpload("image"),
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const imageUrl = await singlePublicFileUpload(req.file)
        
        const user = await User.signup({ 
            email, 
            username, 
            password,
            imageUrl, 
        });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

// GET all users 
router.get("/all", asyncHandler(async (req, res) => {
    const allUsers = await User.findAll()

    return res.json(allUsers)
}))

router.get("/:userId", asyncHandler(async (req, res) => {
    const userId = parseInt(req.params.userId, 10)
    const user = await User.findByPk(userId)

    return res.json(user)
}))


module.exports = router;