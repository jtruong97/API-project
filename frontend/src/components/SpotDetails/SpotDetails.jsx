import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpecificSpot } from '../../store/spots';
import './SpotDetails.css'

const SpotDetails = () => {
    const {spotId} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpecificSpot(spotId))
    },[spotId, dispatch]) //if spotId changes, triggers dispatch to fetch specific spot Id

    const spot = useSelector(state => { //consumes store context
        //console.log('STATE',state)
        return state.spotsState.spot
    })

    if(!spot) { //first render is null so this returns if spot is null
        return
    }

    let newImgArr = [...spot.SpotImages] //copy arr and remove first image
    newImgArr.shift()

    let rating = parseInt(spot.avgStarRating).toFixed(1)
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
    console.log('SPOT',spot)

    return (
        <div>
            <h1>{spot.name}</h1>
            <div className='spot-location'>
                Location: {spot.city}, {spot.state}, {spot.country}
            </div>
            <div className='img-container'>
                <img className='spotId-large-img'src={`${spot.SpotImages[0].url}`}/>
                <div className='small-img-container'>
                    {newImgArr.length ? newImgArr.map(image => (
                        <img key={image.id} className='spotId-small-img' src={`${image.url}`} alt={spot.name}/>
                    )) : null}
                </div>
            </div>
            <div className='below-img-container'>
                <div className ='host-description-container'>
                    <div className='spotId-host'>
                        Hosted by {spot.Owner.firstName}, {spot.Owner.lastName}
                    </div>
                    <div className='spot-description'>
                        {spot.description}
                    </div>
                </div>
                <div className='callout-container'>
                    <div className='price-rating-rev-container'>
                        <p className='callout-price'>${spot.price} / night</p>
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
            <div>
                <div className='star-rating-review'>
                    <img className='stardrop-img' src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop'/>
                    <p>{rating} {rev}</p>
                </div>
            </div>
        </div>
    )
}


export default SpotDetails
