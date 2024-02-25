import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { getReviews } from '../../store/reviews';
import CreateReviewModal from '../ReviewModal/ReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';

const GetSpotReviews = ({spot}) =>{
    const users = useSelector(state => {return state.session})
    const reviews = useSelector(state => {return state.reviewState})
    const dispatch = useDispatch();

    const [postReview, setPostReview] = useState(false)
    const [deleteReview, setDeleteReview] = useState(false)

    const renderReview = () => { //after posting
        setPostReview(curr => !curr)
    }
    const renderDelete = () => {
        setDeleteReview(curr => !curr)
    }

    // console.log('REVIEWS STATE: ', reviews)
    let reviewsArr = Object.values(reviews)
    let spotId = spot.id

    useEffect(()=>{
        dispatch(getReviews(spotId))
    },[dispatch, spotId, deleteReview, postReview])

    let rating = parseFloat(spot.avgStarRating).toFixed(1)
    if(isNaN(rating)){
        rating = 'New'
    }

    let rev ='';
    let numReview = spot.numReviews
    if(numReview == 1){
        rev = `• ${numReview} Review`
    }
    if(numReview == 0){
        rev = ''
    }
    if(numReview > 1){
        rev = `• ${numReview} Reviews`
    }

    let currRevArr = []
    if(reviewsArr.length){
        reviewsArr.forEach(rev => {
            let date = (new Date(rev.createdAt)).toDateString()
            let month = date.slice(4,8)
            const year = (new Date(rev.createdAt)).getFullYear()
            rev.newDate = `${month} ${year}`
        })
        reviewsArr.map(rev => {
            if(rev.spotId ==  spot.id){
                currRevArr.push(rev)
            }
        })
    }
    let userId = users.user ? users.user.id : null
    currRevArr.reverse();

    let hasReview = currRevArr.filter((rev) => rev.userId == userId)

    return(
        <>
        <div className='spot-details-review-header'>
                <div className='star-rating-review'>
                    <img className='stardrop-img-review' src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop'/>
                    <p>{rating} {rev}</p>
                </div>
            </div>
            {users.user && spot.ownerId !== userId && hasReview.length == 0 &&
                (<button className='post-rev-button'>
                <OpenModalMenuItem
                    itemText='Post Your Review'
                    modalComponent={<CreateReviewModal spotId={spotId} renderReview={renderReview}/>}
                /></button>)
            }
            <div className ='reviews-container'>
                {currRevArr.map(review => (
                    <div key={review?.id}>
                        <p className='spot-details-firstName'>{review.User?.firstName}</p>
                        <p className='spot-details-date'>{review?.newDate}</p>
                        <p className='spot-details-review'>{review?.review}</p>
                        {hasReview.length > 0 && review.User?.id == userId && (<button className='delete-rev-button'>
                            <OpenModalMenuItem
                                itemText='Delete'
                                modalComponent={<DeleteReviewModal reviewId={review.id} renderDelete={renderDelete} spotId={spotId}/>}
                            /></button>)}
                    </div>
                ))}
                {currRevArr.length == 0 && users.user && spot.ownerId !== userId &&
                (<p>Be the first to post a review!</p>)}
            </div>
            </>
    )
}

export default GetSpotReviews;
