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
        console.log('STATE',state)
        return state.spotsState.spot
    })

    console.log('SPOT INFO',spot)

    return (
        <div>
            <h1>{spot.name}</h1>
            <div className='spot-location'>
                Location: {spot.city}, {spot.state}, {spot.country}
            </div>
            <div className='spotId-images'>
                {spot.SpotImages.map(image => (
                    <img src={`${image.url}`} alt={spot.name} key={spot.id}/>
                ))}
            </div>
            <div className='spotId-host'>
                Text: Hosted by {spot.Owner.firstName}, {spot.Owner.lastName}
            </div>
            <div className='spot-description'>
                {spot.description}
            </div>
        </div>
    )
}


export default SpotDetails
