const express = require("express");
const asyncHandler = require("express-async-handler");

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User} = require("../../db/models");
const router = express.Router()
const { Sequelize, Op } = require('@sequelize/core');

// GET ALL Search results 

router.get("/:searchQuery", asyncHandler(async (req, res) => {

    const searchQuery = req.params.searchQuery
    // console.log("search query ----> ", searchQuery)
    const results = await Spot.findAll({
      where: {
          title: {
              [Op.iLike]: `%${searchQuery}%`
            }, 
      }, order: [
                ['title', 'ASC'],
            ]
    })
    
    // console.log(results, "<-------res from search")
    res.json(results)
}))

module.exports = router