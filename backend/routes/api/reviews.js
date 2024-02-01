const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router();

router.get('/current', async (req,res) => {
    const currentUserId = req.user.id;

    const reviews = await Review.findAll({
        where: {
            userId: currentUserId
        }
    })
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
        return res.json({Reviews: [response]})
    }
})


const validateReview = [
check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
check('stars')
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5')
]

router.post('/:spotId/reviews', validateReview, async (req, res) => {
    const { spotId } = req.params; //destructure the spotId
    let { review, stars } = req.body
    try{
        let spot = await Spot.findByPk(spotId);
        let newReview = await Review.create({ review, stars });

        res.json(newReview);
    }
    catch(error){
        return res.status(404).json({
            "message": "Bad Request",
            "errors": {
              "review": "Review text is required",
              "stars": "Stars must be an integer from 1 to 5",
            }
          })
    }
})

module.exports = router;
