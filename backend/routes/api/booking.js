const express = require('express');
const { Spot, SpotImage, User, Review, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth')
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// GET ALL BOOKINGS OF CURRENT USER
router.get('/current', requireAuth, async (req,res) => {
    const currentUserId = req.user.id;
    let bookingArr = [];

    let bookings = await Booking.findAll({
        where:{
            userId: currentUserId
        }
    })
    const user = await User.findByPk(currentUserId);

    for(let booking of bookings){
        const spot = await Spot.findByPk(booking.spotId, {
            attributes: ['id', 'ownerId', 'address', 'city', 'state','country', 'lat','lng','name','price']
        })

        const spotImages = await SpotImage.findOne({
            where: {
                spotId: booking.spotId
            }
        })
        spot.dataValues.previewImage = spotImages.url //add url to spot obj

        const response = {
            id: booking.id,
            spotId : booking.spotId,
            Spot: spot,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt
        }
        bookingArr.push(response)
    }
    return res.status(200).json({Bookings: bookingArr})
})

// EDIT A SPECIFIC BOOKING
router.put('/:bookingId', requireAuth, async (req,res) => {
    try{
        let { bookingId } = req.params;
        let userId = req.user.id;
        let { startDate, endDate } = req.body;

        let booking = await Booking.findByPk(bookingId);
        if(!booking){
            return res.status(404).json({ "message": "Booking couldn't be found" })
        }
        if(booking.userId !== userId){
            return res.status(403).json({'message':'This booking must be yours to edit'})
        }

        let today = new Date();
        let editStart = new Date(startDate);
        let editEnd = new Date(endDate);
        if(today > editStart){
            return res.status(403).json({ "message": "startDate cannot be in the past"})
        }
        if(editEnd <= editStart){
            return res.status(400).json({'message': "endDate cannot be on or before startDate"})
        }
        if(booking.endDate < today){
            return res.status(403).json({'message': "Past bookings can't be modified"})
        }

        //validate that these dates are not already booked! booking conflict
        const booked = await Booking.findOne({
            where:{
                id: { [Op.ne]: bookingId },
                spotId: booking.spotId,
                [Op.or]:{
                    startDate : {
                        [Op.between] :[ editStart, editEnd]
                    },
                    endDate: {
                        [Op.between]: [editStart, editEnd]
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

        booking.startDate = startDate || booking.startDate;
        booking.endDate = endDate || booking.endDate;

        await booking.save();
        return res.status(200).json(booking);
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

// DELETE A BOOKING
router.delete('/:bookingId', requireAuth, async (req,res) => {
    let { bookingId } = req.params;
    let userId = req.user.id;
    let booking = await Booking.findByPk(bookingId);

    if(!booking){
        return res.status(404).json({ "message": "Booking couldn't be found"})
    }
    if(booking.userId !== userId){
        return res.status(403).json({'message':'Must be your booking to delete'})
    }

    await booking.destroy();
    return res.status(200).json({ "message": "Successfully deleted"})
})

module.exports = router;
