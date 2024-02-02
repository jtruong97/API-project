const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router();


router.delete('/:imageId', async (req,res) => {
    let { imageId } = req.params;
    let userId = req.user.id;

    let spotImg = await SpotImage.findByPk(imageId,{attributes:['id','spotId','url','preview']})
    if(!spotImg){
        return res.status(404).json({ "message": "Spot Image couldn't be found" })
    }

    let spot = await Spot.findByPk(spotImg.spotId)

    if(spot.ownerId !== userId){
        return res.status(403).json({'message':'This spot must belong to the current user'})
    }

    await spotImg.destroy();
    return res.json({ "message": "Successfully deleted" })
})

module.exports = router;
