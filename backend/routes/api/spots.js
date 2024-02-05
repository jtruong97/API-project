const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//PAGINATION
const validatePag = [
    query('page')
        .optional({ checkFalsy: true })
        .isInt({min:1, max:10})
        .withMessage("Page must be greater than or equal to 1 and less than 10"),
    query('size')
        .optional({ checkFalsy: true })
        .isInt({min:1, max:20})
        .withMessage("Size must be greater than or equal to 1 and less than 20"),
    query('minLat')
        .isFloat({min: -90, max: 90})
        .optional({checkFalsy : true})
        .withMessage("Minimum latitude is invalid"),
    query('maxLat')
        .isFloat({min: -90, max: 90})
        .optional({checkFalsy : true})
        .withMessage("Maximum latitude is invalid"),
    query('minLng')
        .isFloat({min:-180, max:180})
        .optional({checkFalsy : true})
        .withMessage("Maximum longitude is invalid"),
    query('maxLng')
        .isFloat({min:-180, max:180})
        .optional({checkFalsy : true})
        .withMessage("Minimum longitude is invalid"),
    query('minPrice')
        .isFloat({min:0})
        .optional({checkFalsy : true})
        .isCurrency({allow_negatives: false})
        .withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice')
        .isFloat({min: 0})
        .optional({checkFalsy : true})
        .isCurrency({allow_negatives: false})
        .withMessage("Maximum price must be greater than or equal to 0"),
    handleValidationErrors
    ]

// GET ALL SPOTS
router.get('/', validatePag, async (req,res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    let queryObj = {
        where: {}
    }

    if(!page || (parseInt(page) == NaN)) page = 1;
    if(!size || (parseInt(size) == NaN)) size = 20;

    queryObj.limit = size;
    queryObj.offset = size * (page - 1);

    if(minLat){
        queryObj.where.lat = {
            [Op.gte]: parseFloat(minLat)
        }
    }
    if(maxLat){
        queryObj.where.lat = {
            [Op.lte]: parseFloat(maxLat)
        }
    }
    if(minLng){
        queryObj.where.lng = {
            [Op.gte]: parseFloat(minLng)
        }
    }
    if(maxLng){
        queryObj.where.lng = {
            [Op.lte]: parseFloat(maxLng)
        }
    }
    if(minPrice){
        queryObj.where.price = {
            [Op.gte]: parseFloat(minPrice)
        }
    }
    if(maxPrice){
        queryObj.where.price = {
            [Op.lte] : parseFloat(maxPrice)
        }
    }

    const spots = await Spot.findAll({...queryObj})
    let spotArr = []
    for(let spot of spots){
        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            }
        });

        let avgRating = 0
        reviews.forEach(review => {
            avgRating += review.stars
        })
        spot.dataValues.avgRating = parseFloat((avgRating/reviews.length).toFixed(1))
        if(isNaN(avgRating) || !avgRating){
            spot.dataValues.avgRating = 'No Rating'
        }

        const prevImg = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })
        if(!prevImg){
            spot.dataValues.previewImage = 'No Images'
        }
        else{
            spot.dataValues.previewImage = prevImg.url
        }

        const response = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.dataValues.avgRating,
            previewImage : spot.dataValues.previewImage
        }
        spotArr.push(response)
    }
    page = parseInt(page)
    size = parseInt(size)
    return res.status(200).json({Spots: spotArr, page:page, size: size})
})

// GET ALL SPOTS BY CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const currentUserId = req.user.id;
    let spotArr = [];
    const spots = await Spot.findAll({
        where: {
            ownerId: currentUserId
        }
    })
    for(let spot of spots){
        const reviews = await Review.findAll({
            where: {
            spotId: spot.id
            }
        });
        let avgRating = 0
        reviews.forEach(review => {
            avgRating += review.stars
        })

        spot.dataValues.avgRating = parseFloat((avgRating/reviews.length).toFixed(1))
        if(isNaN(avgRating) || !avgRating){
            spot.dataValues.avgRating = 'No Rating'
        }
        const prevImg = await SpotImage.findOne({
            where: {
                spotId: spot.id
            }
        })
        if(!prevImg){
            spot.dataValues.previewImage = 'No Images'
        }
        else{
            spot.dataValues.previewImage = prevImg.url
        }
        const response = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            avgRating: spot.dataValues.avgRating,
            previewImage : spot.dataValues.previewImage
        }
        spotArr.push(response)
    }
    return res.status(200).json({Spots: spotArr})
})

// GET SPOT BY SPOT ID
router.get('/:spotId', async (req,res) => {
    let { spotId } = req.params;
    let spot = await Spot.findByPk(spotId)

    if(!spot){
        res.status(404)
        return res.json({ "message": "Spot couldn't be found" })
    }

    let reviews = await Review.findAll({
        where: {
            spotId: spot.id
        }
    })

    spot.dataValues.numReviews = reviews.length
    let avgRating = 0
    reviews.forEach(review => {
        avgRating += review.stars
    })
    spot.dataValues.avgRating = parseFloat((avgRating/reviews.length).toFixed(1))
    if(isNaN(avgRating) || !avgRating){
        spot.dataValues.avgRating = 'No Rating'
    }

    let spotImgs = await SpotImage.findAll({
        where: {
            spotId: spot.id
        }
    })
    let owner = await User.findOne({
        where: {
            id : spot.ownerId
        },
        attributes: ['id','firstName','lastName']
    })

    const response = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        numReviews: spot.dataValues.numReviews,
        avgStarRating: spot.dataValues.avgRating,
        SpotImages: spotImgs,
        Owner: owner
    }
    return res.status(200).json(response)
})

//validate spot middleware
const validateSpot = [
check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required.'),
check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required.'),
check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required.'),
check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required.'),
check('lat')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be within -90 and 90'),
check('lng')
    .isFloat({ min: -180, max: 180})
    .withMessage('Longitude must be within -180 and 180'),
check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50})
    .withMessage('Name must be less than 50 characters'),
check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
check('price')
    .exists({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage('Price per day must be a positive number'),
handleValidationErrors
];

// CREATE A SPOT
router.post('/', requireAuth, validateSpot, async (req,res) => {
        let { address, city, state, country, lat, lng, name, description, price } = req.body;
        const currentUserId = req.user.id
        let newSpot = await Spot.create({ ownerId: currentUserId, address, city, state, country, lat, lng, name, description, price })
        let response = {
            id: newSpot.id,
            ownerId: newSpot.ownerId,
            address: newSpot.address,
            city: newSpot.city,
            state: newSpot.state,
            country: newSpot.country,
            lat: newSpot.lat,
            lng: newSpot.lng,
            name: newSpot.name,
            description: newSpot.description,
            price: newSpot.price,
            createdAt: newSpot.createdAt,
            updatedAt: newSpot.updatedAt
        }
        return res.status(201).json(response)
})

// ADD AN IMAGE TO SPOT BASED ON SPOT ID
router.post('/:spotId/images', requireAuth, async (req,res) => {
    let { spotId } = req.params;
    let currentUserId = req.user.id;
    let spot = await Spot.findByPk(spotId);

    if(!spot){
        return res.status(404).json({'message': 'Spot could not be found'})
    }
    if(spot.ownerId !== currentUserId){
        return res.status(403).json({'message': "Forbidden"})
    }

    let { url, preview } = req.body;
    let newSpotImg = await SpotImage.create({ spotId: spotId ,url, preview })

    const response = {
        id: newSpotImg.id,
        url: newSpotImg.url,
        preview: newSpotImg.preview
    }
    return res.status(200).json(response)
})

//EDIT A SPOT
router.put('/:spotId', validateSpot, requireAuth, async (req,res) => {

    let { spotId } = req.params;
    let currentUserId = req.user.id;
    let { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        return res.status(404).json({"message": "Spot couldn't be found"})
    }
    if(spot.ownerId !== currentUserId){
        return res.status(403).json({'message': "Forbidden"})
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

    const response = {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt
    }
    return res.status(200).json(response)
})

// DELETE A SPOT
router.delete('/:spotId', requireAuth, async (req, res) => {
    let { spotId } = req.params;
    let currentUserId = req.user.id;
    const spot = await Spot.findByPk(spotId)

    if(!spot){
        return res.status(404).json({ "message": "Spot couldn't be found" })
    }
    if(spot.ownerId !== currentUserId){
        return res.status(403).json({'message':"Forbidden"})
    }

    await spot.destroy();
    return res.status(200).json({ "message": "Successfully deleted" })
})

//GET ALL REVIEWS BASED ON SPOT ID
router.get('/:spotId/reviews', async (req,res) => {
    let { spotId } = req.params;
    let revArr = []
    spotId = parseInt(spotId)

    let spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.status(404).json({ "message": "Spot couldn't be found" })
    }
    spotId = parseInt(spotId) //check for hanging
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
        let user = await User.findByPk(review.userId)

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
        revArr.push(response)
    }
    return res.status(200).json({Reviews: revArr})
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

//CREATE A REVIEW BASED ON SPOT ID
router.post('/:spotId/reviews', validateReview, requireAuth, async (req, res) => {
    const { spotId } = req.params;
    let { review, stars } = req.body
    let userId = req.user.id;

    let spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.status(404).json({"message": "Spot couldn't be found"})
    }
    let findReview = await Review.findOne({
        where: { spotId, userId },
      });
      if (findReview) {
        return res.status(500).json({ message: "User already has a review for this spot" });
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
    return res.status(201).json(response);
})

// GET ALL BOOKINGS BASED ON SPOT ID
router.get('/:spotId/bookings', requireAuth, async(req, res) => {
    let { spotId } = req.params;
    const currentUserId = req.user.id;
    let bookingArr = [];

    let spot = await Spot.findByPk(spotId);
    if(!spot){
        return res.status(404).json({ "message": "Spot couldn't be found" })
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
            bookingArr.push(response)
        }
        else{ //you are not the owner of the spot
            const response = {
                spotId: booking.spotId,
                startDate: booking.startDate,
                endDate: booking.endDate
            }
            bookingArr.push(response)
        }
    }
    res.status(200).json({Bookings: bookingArr})
})

// const validateBooking = [
// check('startDate')
//     .exists({ checkFalsy: true})
//     .isDate({format: 'YYYY-MM-DD'}),
// check('endDate')
//     .exists({ checkFalsy: true})
//     .isDate({format: 'YYYY-MM-DD'}),
// handleValidationErrors
// ]

// CREATE A BOOKING FOR A SPOT
router.post('/:spotId/bookings', requireAuth, async(req,res) => {
    const  { spotId } = req.params;
    let { startDate, endDate } = req.body;
    let userId = req.user.id;

        let spot = await Spot.findByPk(spotId)
        if(!spot){
            return res.status(404).json({ "message": "Spot couldn't be found" })
        }
        if(spot.ownerId == userId){
            return res.status(403).json({'message':'Forbidden'})
        }

        let today = new Date();
        let newStart = new Date(startDate);
        let newEnd = new Date(endDate);

        if(today > newStart){
            return res.status(400).json({
                "message": "Bad Request",
                "errors": { "startDate": "startDate cannot be in the past"}
              })
        }
        if(newEnd <= newStart){
            return res.status(400).json({
                "message": "Bad Request",
                "errors": { "endDate": "endDate cannot be on or before startDate" }
              })
        }

        const booked = await Booking.findOne({
            where:{
                spotId: spotId,
                [Op.or]:{
                    startDate : {
                        [Op.between] :[ newStart, newEnd]
                    },
                    endDate: {
                        [Op.between]: [newStart, newEnd]
                    }
                }
            }
        })
        if(booked){ 
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
        return res.status(200).json(response)
})


module.exports = router;
