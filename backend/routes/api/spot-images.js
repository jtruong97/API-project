const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router();

router.delete('/:imageId', async (req,res) => {
    try{
        let { imageId } = req.params;
        let userId = req.user.id;

        let spotImg = await SpotImage.findByPk(imageId)
        if(!spotImg){
            return res.status(404).json({ "message": "Spot Image couldn't be found" })
        }
        //console.log('spotImg', spotImg)
        let spot = await Spot.findByPk(spotImg.spotId)
        //console.log('SPOT',spot) // <-- null
        if(spot.ownerId !== userId){
            return res.status(400).json({'message':'This spot must belong to the current user'})
        }

        await spotImg.destroy();
        return res.json({ "message": "Successfully deleted" })
    }
    catch(error){
        return res.json(console.log(error))
    }
})


module.exports = router;
