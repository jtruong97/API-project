import { useState, useEffect } from 'react';
import SpotTile from './SpotTile';
import './LandingPage.css'

const LandingPage = () => {
    const [spots, setSpots] = useState([]);

    useEffect(()=> {
        const getSpots = async () => {
            const response = await fetch ('/api/spots');
            const data = await response.json();
            if(data && data.Spots) {
                setSpots(data.Spots);
            }
            // if(!data.ok){
            //     throw new Error ('Could not fetch spots')
            // }
        }
        getSpots();
    },[])

    return(
        <div className='tile-container'>
            {spots.map(spot => (
                <SpotTile key={spot.id} spot={spot}/> //passes spot prop
            ))}
        </div>
    )
}


export default LandingPage;
