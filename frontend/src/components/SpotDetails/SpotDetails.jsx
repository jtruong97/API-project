import { useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpecificSpot } from '../../store/spots';
import { getReviews } from '../../store/reviews';
import CreateReviewModal from '../ReviewModal/ReviewModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import './SpotDetails.css'

const SpotDetails = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => {return state.spotsState})
    const reviews = useSelector(state => {return state.reviewState})
    const users = useSelector(state => {return state.session})

    const [postReview, setPostReview] = useState(false)
    const [deleteReview, setDeleteReview] = useState(false)
    // const [renderSpotId, setRenderSpotId] = useState(false)

    const renderReview = () => {
        setPostReview(curr => !curr)
    }
    const renderDelete = () => {
        setDeleteReview(curr => !curr)
    }

    useEffect(() => {
        dispatch(fetchSpecificSpot(spotId))
        dispatch(getReviews(spotId))
    },[spotId,dispatch, deleteReview, postReview]) //if spotId changes, triggers dispatch to fetch specific spot Id

    let reviewsArr = Object.values(reviews)
    if( //rerenders page if none of these exist
        !reviewsArr.length ||
        !reviewsArr.every(rev=>rev.createdAt) ||
        !spot[spotId] ||
        !spot[spotId].SpotImages)
        {
        return <div>Loading...</div>
    }

    let currSpot = spot[spotId]

    let imgarr = [currSpot.SpotImages]
    let newImgArr = structuredClone(...imgarr) //copy arr and remove first image
    newImgArr.shift()

    //rating format
    let rating = parseFloat(currSpot.avgStarRating).toFixed(1)
    if(isNaN(rating)){
        rating = 'New'
    }
    //reviews str format
    let rev ='';
    let numReview = currSpot.numReviews
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
        let revArr = reviewsArr.sort((a,b) => { //sorted array with ALL reviews
            return new Date(a.createdAt) - new Date(b.createdAt)
        })
        revArr.forEach(rev => {
            let date = (new Date(rev.createdAt)).toDateString()
            let month = date.slice(4,8)
            const year = (new Date(rev.createdAt)).getFullYear()
            rev.newDate = `${month} ${year}`
        })
        revArr.map(rev => {
            if(rev.spotId ==  currSpot.id){
                currRevArr.push(rev)
            }
        })
    }
    let userId = users.user ? users.user.id : null
    let hasReview = currRevArr.filter((rev) => rev.User.id == userId)

    return (
        <div className='spot-details-container'>
            <h1 className='spot-name'>{currSpot.name}</h1>
            <div className='spot-location'>
                {currSpot.city}, {currSpot.state}, {currSpot.country}
            </div>
            <div className='img-container'>
                <img className='spotId-large-img'src={`${imgarr[0][0].url}`}/>
                <div className='small-img-container'>
                    {newImgArr.length ? newImgArr.map(image => (
                        <img key={image.id} className='spotId-small-img' src={`${image.url}`} alt={currSpot.name}/>
                    )) : null}
                </div>
            </div>
            <div className='below-img-container'>
                <div className ='host-description-container'>
                    <div className='spotId-host'>
                        Hosted by {currSpot.Owner.firstName} {currSpot.Owner.lastName}
                    </div>
                    <div className='spot-description'>
                        {currSpot.description}
                    </div>
                </div>
                <div className='callout-container'>
                    <div className='price-rating-rev-container'>
                        <p className='callout-price'>${currSpot.price} / night</p>
                        <div className='star-rating-container'>
                            <img className='stardrop-img' src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop'/>
                            <p>{rating} {rev}</p>
                        </div>
                    </div>
                    <button className='reserve-button'
                        onClick={() => alert('Feature coming soon')}
                    >Reserve</button>
                </div>
            </div>
            <hr></hr>
            <div className='spot-details-review-header'>
                <div className='star-rating-review'>
                    <img className='stardrop-img-review' src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop'/>
                    <p>{rating} {rev}</p>
                </div>
            </div>
            {users.user && currSpot.ownerId !== userId && hasReview.length == 0 &&
                (<button className='post-rev-button'>
                <OpenModalMenuItem
                    itemText='Post Your Review'
                    modalComponent={<CreateReviewModal spotId={spotId} renderReview={renderReview}/>}
                /></button>)
            }
            <div className ='reviews-container'>
                {currRevArr.map(review => (
                    <div key={review.id}>
                        <p className='spot-details-firstName'>{review.User.firstName}</p>
                        <p className='spot-details-date'>{review.newDate}</p>
                        <p className='spot-details-review'>{review.review}</p>
                        {hasReview.length > 0 && review.User.id == userId && (<button className='delete-rev-button'>
                            <OpenModalMenuItem
                                itemText='Delete'
                                modalComponent={<DeleteReviewModal reviewId={review.id} renderDelete={renderDelete} spotId={spotId}/>}
                            /></button>)}
                    </div>
                ))}
                {currRevArr.length == 0 && users.user && currSpot.ownerId !== userId &&
                (<p>Be the first to post a review!</p>)}
            </div>
        </div>
    )
}


export default SpotDetails
