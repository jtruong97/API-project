import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createReview } from '../../store/reviews';
import StarRating from './StarRating';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSpecificSpot } from '../../store/spots';
import './ReviewModal.css'

const CreateReviewModal = ({spotId, renderReview}) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const nav = useNavigate();

    const [review, setReview ] = useState('');
    const [rating, setRating] = useState(null)
    const [validate, setValidate] = useState({})

    const starClick = (star) => {
        setRating(star) //set rating to star clicked
    }

    useEffect(()=> {
        let valObj = {};
        if(review.length < 10){
            valObj.review = 'Your review must be at least 10 characters long'
        }
        setValidate(valObj)
    },[review])

   const onSubmit = async (e) => {
    e.preventDefault();
    let newRev = {review:review, stars:rating }

    let newReview = await dispatch(createReview(newRev, spotId))
    if(!newReview) return;
    dispatch(fetchSpecificSpot(spotId))
    closeModal()
    renderReview();
    nav(`/spots/${spotId}`)
   }

    return(
        <form
            className='review-form'
            onSubmit={onSubmit}
        >
            <h1 className='create-review-header'>How was your stay?</h1>
            <label>
                <textarea
                    className='review-input'
                    type='text'
                    name='description'
                    value={review}
                    placeholder='Leave your review here...'
                    onChange={(e)=> setReview(e.target.value)}
                />
            </label>
            {/* {review.error && (<p>{validate.review}</p>)} */}
            <div className='star-container'>
                <StarRating rating={rating} starClick={starClick}/>
            </div>
            <div className='rev-button-container'>
                <button
                    className='review-button'
                    type='submit'
                    disabled={Object.keys(validate).length > 0 || !rating}
                >Submit Your Review</button>
            </div>
        </form>
    )
}

export default CreateReviewModal;
