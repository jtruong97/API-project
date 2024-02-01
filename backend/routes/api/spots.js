const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { check } = require('express-validator');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/', async (req,res) => { // get all spots NEED TO REMOVE NAN AVG RATINGS
    const spots = await Spot.findAll()
    for(let spot of spots){
        console.log('SPOT',spot)
        const reviews = await Review.findAll({
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
    const currentUserId = req.user.id;
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
})

router.get('/:spotId', async (req,res) => { //NEED TO ALIAS USER TO OWNER
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
    try{
        let { address, city, state, country, lat, lng, name, description, price } = req.body; //destructure
        const userId = req.user.id

        let newSpot = await Spot.create({ ownerId: userId, address, city, state, country, lat, lng, name, description, price })

        let response = {
            address: newSpot.address,
            city: newSpot.city,
            state: newSpot.state,
            country: newSpot.country,
            lat: newSpot.lat,
            lng: newSpot.lng,
            name: newSpot.name,
            description: newSpot.description,
            price: newSpot.price
        }
        return res.json(response)
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
    let newSpotImg = await SpotImage.create({ url, preview }) //creates a new image with post input
    spot.dataValues.previewImage = newSpotImg

    const response = {
        id: newSpotImg.id,
        url: newSpotImg.url,
        preview: newSpotImg.preview
    }
    return res.json(response)
})

router.put('/:spotId', validateSpot, async (req,res) => {
    try{
        let { spotId } = req.params;    //destructure the spotId
        const spot = await Spot.findByPk(spotId)
        let userId = req.user.id;
        let { address, city, state, country, lat, lng, name, description, price } = req.body;
        if(!spot){
            return res.status(404).json({"message": "Spot couldn't be found"})
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

router.get('/:spotId/reviews', async (req,res) => {
    let { spotId } = req.params;
    const currentUserId = req.user.id;

    let spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.json({ "message": "Spot couldn't be found" })
    }

    let reviews = await Review.findAll({
        where: {
            spotId : spotId
        }
    })

    for (let review of reviews) {
        let reviewimg = await ReviewImage.findAll({
            where: {
                reviewId : review.id
            },
            attributes : ['id', 'url']
        })
        let user = await User.findByPk(currentUserId)

        let response = {
            id: review.id,
            userId: review.userId,
            spotId: review.spotId,
            review: review.review,
            stars: review.stars,
            createdAt: review.createdAt,
            uodatedAt: review.updatedAt,
            User: user,
            ReviewImages: reviewimg
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
    let userId = req.user.id;

    try{
        let spot = await Spot.findByPk(spotId);
        if(!spot){
            return res.status(404).json({"message": "Spot couldn't be found"})
        }
        let newReview = await Review.create({ userId: userId, spotId: spotId, review, stars });

        const response = {
            id: newReview.id,
            userId : newReview.userId,
            spotId: newReview.spotId,
            review: newReview.review,
            stars: newReview.stars,
            createdAt: newReview.createdAt,
            updatedAt: newReview.updatedAt
        }
        return res.json(response);
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

router.get('/:spotId/bookings', async(req, res) => {
    let { spotId } = req.params;
    const currentUserId = req.user.id;

    let spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.json({ "message": "Spot couldn't be found" })
    }

    let bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })

    for(let booking of bookings){
        const user = await User.findByPk(currentUserId);
        if(booking.userId == user.id){ //if you are the owner
            const response = {
                User: user,
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }
            return res.json({Bookings: [response]})
        }
        else{ //you are not the owner of the spot
            const response = {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
            return res.json({Bookings: [response]})
        }
    }
})

const validateBooking = [
    check('startDate')
    .exists({ checkFalsey: true})
    .isDate({format: 'YYYY-MM-DD'}),
    check('endDate')
    .exists({ checkFalsey: true})
    .isDate({format: 'YYYY-MM-DD'}),
]

router.post('/:spotId/bookings', validateBooking, async(req,res) => {
    const  { spotId } = req.params;
    let { startDate, endDate } = req.body;
    let userId = req.user.id;

    try{
        let spot = await Spot.findByPk(spotId)
        if(!spot){
            return res.status(404).json({ "message": "Spot couldn't be found" })
        }
        if(spot.ownerId == userId){
            return res.status(403).json({'message':'You are not allowed to book your own spot'})
        }

        const booked = await Booking.findOne({ //already booked
            where:{
                spotId: spotId,
                [Op.or]:{
                    startDate : {
                        [Op.between] :[ startDate, endDate]
                    },
                    endDate: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            }
        })
        if(booked){ //if something is booked
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "errors": {
                  "startDate": "Start date conflicts with an existing booking",
                  "endDate": "End date conflicts with an existing booking"
                }
              })
        }

        let newBooking = await Booking.create({ userId: userId, spotId: spotId, startDate, endDate })
        const response = {
            id: newBooking.id,
            spotId: newBooking.spotId,
            userId: newBooking.userId,
            startDate: newBooking.startDate,
            endDate: newBooking.endDate,
            createdAt: newBooking.createdAt,
            updatedAt: newBooking.updatedAt
        }
        return res.json(response)
    }
    catch(error){
        return res.status(400).json({
            "message": "Bad Request",
            "errors": {
              "startDate": "startDate cannot be in the past",
              "endDate": "endDate cannot be on or before startDate"
            }
          })
    }
})


module.exports = router;
