const express = require('express');
const { Spot, SpotImage, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');

const router = express.Router();

router.get('/', async (req,res) => { // get all spots
    const spots = await Spot.findAll() //returns all the spots
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
        // if(avgRating == NaN){
        //     spot.dataValues.avgRating = 0
        // }
        spot.dataValues.avgRating = (avgRating/reviews.length).toFixed(1) //add avgRating into spot obj

        const prevImg = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })
        if(prevImg){
            spot.dataValues.previewImage = prevImg.url //add previewImage into spot obj
        }
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

    if(isNaN(spot.dataValues.avgRating)){
        delete spot.dataValues.avgRating
    }

    const prevImg = await SpotImage.findOne({
        where: {
            spotId: spot.id
        }
    })
    if(prevImg){
        spot.dataValues.previewImage = prevImg.url //add previewImage into spot obj
    }
}

    return res.json({spots})
//    return {
//     id: spots.id,
// 	ownerId: spots.ownerId,
// 	address: spots.address,
// 	city: spots.city,
// 	state: spots.state,
// 	country: spots.country,
// 	lat: spots.lat,
// 	lng: spots.lng,
// 	name: spots.name,
// 	description: spots.description,
// 	price: spots.price,
// 	createdAt: spots.createdAt,
// 	updatedAt: spots.updatedAt,
//     avgRating: spots.avgRating,
//     previewImage: spots.previewImage
//    }
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
    if(isNaN(spot.dataValues.avgRating)){
        delete spot.dataValues.avgRating
    }

    res.json({spot})
})

const validateSpot = [ //validate spot middleware
check('address')
    .exists({ checkFalsey: true })
    .withMessage('Street address is required.'),
check('city')
    .exists({ checkFalsey: true })
    .withMessage('City is required.'),
check('state')
    .exists({ checkFalsey: true })
    .withMessage('State is required.'),
check('country')
    .exists({ checkFalsey: true })
    .withMessage('Country is required.'),
check('lat')
    .isInt({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
check('lng')
    .isInt({ min: -180, max: 180})
    .withMessage('Longitude must be within -180 and 180'),
check('name')
    .exists({ checkFalsey: true })
    .isLength({ max: 50})
    .withMessage('Name must be less than 50 characters'),
check('description')
    .exists({ checkFalsey: true })
    .withMessage('Description is required'),
check('price')
    .exists({ checkFalsey: true })
    .isCurrency({ allow_negatives: false })
    .withMessage('Price per day must be a positive number')
];

router.post('/', validateSpot, async (req,res) => { //create a spot
    //try{
        let { address, city, state, country, lat, lng, name, description, price } = req.body; //destructure
        const userId = req.user.id

        let newSpot = await Spot.create({ ownerId: userId, address, city, state, country, lat, lng, name, description, price })

        res.json(newSpot)
    // }
    // catch(error){
    //     return res.status(400).json({
    //         "message": "Bad Request",
    //         "errors": {
    //           "address": "Street address is required",
    //           "city": "City is required",
    //           "state": "State is required",
    //           "country": "Country is required",
    //           "lat": "Latitude must be within -90 and 90",
    //           "lng": "Longitude must be within -180 and 180",
    //           "name": "Name must be less than 50 characters",
    //           "description": "Description is required",
    //           "price": "Price per day must be a positive number"
    //         }
    //       })
    // }
})

router.post('/:spotId/images', async (req,res) => { // NEED TO REMOVE CREATED AND UPDATED AT

    let { spotId } = req.params;    //destructure the spotId
    let spot = await Spot.findByPk(spotId);
    let userId = req.user.id;

    if(!spot){
        return res.status(404).json({'message': 'Spot could not be found'})
    }
    if(spot.ownerId !== userId){
        return res.status(400).json({'message':'This spot must belong to the current user'})
    }

    let { url, preview } = req.body; //destructure from the body
    //let newSpotImg = await SpotImage.create({ url, preview }) //creates a new image with post input
    let newSpotImg = SpotImage.build({ url, preview });
    await newSpotImg.validate();
    await newSpotImg.save();

    return res.json(newSpotImg)
})

router.put('/:spotId', validateSpot, async (req,res) => {
    try{
        let { spotId } = req.params;    //destructure the spotId
        const spot = await Spot.findByPk(spotId)
        let userId = req.user.id;
        let { address, city, state, country, lat, lng, name, description, price } = req.body;
        if(!spot){
            return res.status(400).json({"message": "Spot couldn't be found"})
        }
        if(spot.ownerId !== userId){
            return res.status(400).json({'message':'This spot must belong to the current user'})
        }

        spot.address = address || spot.address;
        spot.city = city || spot.city;
        spot.state = state || spot.state;
        spot.country = country || spot.country;
        spot.lat = lat || spot.lat;
        spot.lng = lng || spot.lng;
        spot.name = name || spot.name;
        spot.description = description || spot.description;
        spot.price = price || spot.price;

        await spot.save();
        return res.json(spot)
    }
    catch(error){
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
              "address": "Street address is required",
              "city": "City is required",
              "state": "State is required",
              "country": "Country is required",
              "lat": "Latitude must be within -90 and 90",
              "lng": "Longitude must be within -180 and 180",
              "name": "Name must be less than 50 characters",
              "description": "Description is required",
              "price": "Price per day must be a positive number"
            }
          })
    }
})

router.delete('/:spotId', async (req, res) => {
    let { spotId } = req.params;    //destructure the spotId
    const spot = await Spot.findByPk(spotId)
    let userId = req.user.id;

    if(!spot){
        return res.status(404).json({ "message": "Spot couldn't be found" })
    }
    if(spot.ownerId !== userId){
        return res.status(400).json({'message':'This spot must belong to the current user'})
    }

    await spot.destroy();
    return res.json({ "message": "Successfully deleted" })
})



module.exports = router;