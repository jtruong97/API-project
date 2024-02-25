import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpecificSpot } from '../../store/spots';
import GetSpotReviews from '../Reviews/Review';
import './SpotDetails.css'

const SpotDetails = () => {
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector(state => {return state.spotsState})

    useEffect(() => {
        dispatch(fetchSpecificSpot(spotId))
    },[spotId,dispatch]) //if spotId changes, triggers dispatch to fetch specific spot Id


    if(!spot[spotId] || !spot[spotId].SpotImages) return <div>Loading...</div>

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
            <div >
                <GetSpotReviews spot={currSpot}/>
            </div>
        </div>
    )
}


export default SpotDetails
