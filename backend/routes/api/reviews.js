const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// GET ALL REVIEWS BASED ON CURRENT USER
router.get('/current', requireAuth, async (req,res) => {
    const currentUserId = req.user.id;
    let revArr = [];

    const reviews = await Review.findAll({
        where: {
            userId: currentUserId
        }
    })
    // if(reviews.length === 0){
    //     return res.json([]);
    // }

    const user = await User.findByPk(currentUserId)

    for(let review of reviews){
        const spot = await Spot.findByPk(review.spotId,{
            attributes: ['id', 'ownerId', 'address', 'city', 'state','country', 'lat','lng','name','price']
        });

        const spotImages = await SpotImage.findOne({
            where: {
                spotId: review.spotId
            }
        })
        spot.dataValues.previewImage = spotImages.url

        const reviewImages = await ReviewImage.findAll({
            where: {
                reviewId: review.id
            },
            attributes: ['id','url']
        })
        const response = {
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            updatedAt: review.updatedAt,
            User: user,
            Spot: spot,
            ReviewImages: reviewImages
        }
        revArr.push(response)
    }
    return res.status(200).json({Reviews: revArr})
})

// ADD AN IMAGE TO A REVIEW BASED ON REVIEW ID
router.post('/:reviewId/images', requireAuth, async (req,res) => {
    let { reviewId } = req.params;
    let userId = req.user.id;
    let { url, preview } = req.body;

    let review = await Review.findByPk(reviewId);
    if(!review){
        return res.status(404).json({"message": "Review couldn't be found"})
    }
    let imgCount = await ReviewImage.count({
        where: {
            reviewId : reviewId
        }
    })
    if(imgCount >= 10){
        return res.status(403).json({ "message": "Maximum number of images for this resource was reached" })
    }

    let newImg = await ReviewImage.create({ reviewId: reviewId, url, preview });

    let response = {
        id: newImg.id,
        url: newImg.url
    }
    return res.status(200).json(response);
})
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
    ]

// EDIT A REVIEW
router.put('/:reviewId', validateReview, requireAuth, async (req, res) => {
    try{
        let { reviewId } = req.params;
        let userId = req.user.id;
        let { review, stars } = req.body;

        let rev = await Review.findByPk(reviewId);
        if(!rev){
            return res.status(404).json({"message": "Review couldn't be found"})
        }
        if(rev.userId !== userId){
            return res.status(403).json({'message': 'This review must belong to the current user'})
        }

        rev.review = review || rev.review;
        rev.stars = stars || rev.stars;

        await rev.save();
        return res.status(200).json(rev)
    }
    catch(error){
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
              "review": "Review text is required",
              "stars": "Stars must be an integer from 1 to 5",
            }
          })
    }
})

// DELETE A REVIEW
router.delete('/:reviewId', requireAuth, async (req,res) => {
    let { reviewId } = req.params;
    let review = await Review.findByPk(reviewId);
    let userId = req.user.id;

    if(!review){
        return res.status(404).json({ "message": "Review couldn't be found"})
    }
    if(review.userId !== userId){
        return res.status(403).json({'message':'This review must belong to the current user'})
    }

   await review.destroy();
   return res.status(200).json({ "message": "Successfully deleted" })
})

module.exports = router;
