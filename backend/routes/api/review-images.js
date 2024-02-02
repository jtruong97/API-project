const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router();

router.delete('/:imageId', async (req,res) => {
    let { imageId } = req.params;
    let userId = req.user.id;

    let reviewImg = await ReviewImage.findByPk(imageId);
    if(!reviewImg){
        return res.status(404).json({ "message": "Review Image couldn't be found" })
    }

    let review = await Review.findByPk(reviewImg.reviewId)
    if(review.userId !== userId){
        return res.status(400).json({'message':'Cannot delete an image that is not yours'})
    }

    await reviewImg.destroy();
    return res.json({ "message": "Successfully deleted" })
})


module.exports = router;
