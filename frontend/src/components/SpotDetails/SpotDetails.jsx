import { useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSpecificSpot } from '../../store/spots';
import './SpotDetails.css'

const SpotDetails = () => {
    const {spotId} = useParams();
    // console.log('SPOTID',spotId)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSpecificSpot(spotId))
    },[spotId, dispatch]) //if spotId changes, triggers dispatch to fetch specific spot Id

    const spot = useSelector(state => {
        //console.log('STATE',state)
        return state.spotsState.spot
    })

    // console.log('SPOT INFO',spot)
    if(!spot) { //first render is null so this returns if spot is null
        return
    }

    let imgs = spot.SpotImages.filter(image => image.id !== 1) //takes first img out
    //console.log('IMGS', imgs)
    return (
        <div>
            <h1>{spot.name}</h1>
            <div className='spot-location'>
                Location: {spot.city}, {spot.state}, {spot.country}
            </div>
            <div className='img-container'>
                <img className='spotId-large-img'src={`${spot.SpotImages[0].url}`}/>
                <div className='small-img-container'>
                    {imgs.map(image => (
                        <img className='spotId-small-img' src={`${image.url}`} alt={spot.name}/>
                    ))}
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
                    <p className='callout-price'>${spot.price} night</p>
                    <button className='reserve-button'
                        onClick={() => alert('Feature coming soon')}
                    >Reserve</button>
                </div>
            </div>
        </div>
    )
}


export default SpotDetails
