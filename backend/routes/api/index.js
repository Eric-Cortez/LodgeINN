const router = require('express').Router();

//-----------------------------------------------------------------//
//TEST ROUTES 
router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});

const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
// TEST JWT TOKEN SET IN COOKIES     
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        },
    })
    setTokenCookie(res, user);
    return res.json({ user });
}));

//-----------------------------------------------------------------//


module.exports = router;

