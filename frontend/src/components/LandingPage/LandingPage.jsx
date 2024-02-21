import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import SpotTile from './SpotTile';
import { fetchAllSpots } from '../../store/spots';
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch();
    const spot = useSelector(state => { //returns spot obj with specific id
        //console.log('STATE',state)
        return state.spotsState
    })
    useEffect(()=>{
        dispatch(fetchAllSpots())
    },[dispatch])

    let spotsArr = Object.values(spot)
    // console.log('SPOT',spot) // obj of spot objs
    // console.log('SPOTSArr',spotsArr)
    return(
        <div className='tile-container'>
             {spotsArr.map(spot => (
                <SpotTile key={spot.id} spot={spot}/> //passes spot prop
            ))}
        </div>
    )
}

export default LandingPage;
