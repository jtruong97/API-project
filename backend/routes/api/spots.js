const express = require('express');
const { Spot, SpotImage, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', async (req,res) => { // get all spots
    const spots = await Spot.findAll() //returns all the spots
    for(let spot of spots){
        //console.log('SPOTS',spots)
        const reviews = await Review.findAll({ //find all the views for a specific spotId
            where: {
                spotId: spot.id
            }
        });
        let avgRating = 0
        reviews.forEach(review => {
            avgRating += review.stars
        })
        spot.dataValues.avgRating = (avgRating/reviews.length).toFixed(1) //add avgRating into spot obj
        //console.log('avgRating',avgRating)

        const prevImg = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })
        spot.dataValues.previewImage = prevImg.url //add previewImage into spot obj
    }
    return res.json({spots})
})

router.get('/current', async (req, res) => { //get all spots owned by the current user
    const currentUserId = req.user.id; //find the current users id
    //console.log(currentUserId)
   const spots = await Spot.findAll({
    where: {
        ownerId: currentUserId
    }
   })
   for(let spot of spots){
    const reviews = await Review.findAll({ //find all the views for a specific spotId
        where: {
            spotId: spot.id
        }
    });
    let avgRating = 0
    reviews.forEach(review => {
        avgRating += review.stars
    })
    spot.dataValues.avgRating = (avgRating/reviews.length).toFixed(1) //add avgRating into spot obj
    //console.log('avgRating',avgRating)

    const prevImg = await SpotImage.findOne({
        where: {
            spotId: spot.id
        }
    })
    spot.dataValues.previewImage = prevImg.url //add previewImage into spot obj
}

   return res.json({spots})
})

router.get('/:spotId', async (req,res) => {
    let { spotId } = req.params;
    const spot = await Spot.findOne({
        where:{
            id: spotId
        },
        include: [SpotImage, User]
    })

    if(!spot){ //if the :spotId doesnt exist
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found"
          })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spot.id
        }
    })
    spot.dataValues.numReviews = reviews.length
    let avgRating = 0
    reviews.forEach(review => {
        avgRating += review.stars
    })
    spot.dataValues.avgRating = (avgRating/reviews.length).toFixed(1)

    res.json({spot})
})


module.exports = router;
