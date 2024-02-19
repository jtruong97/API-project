import { NavLink } from "react-router-dom";

const SpotTile = ({ spot }) => {
    //console.log('spot',spot)
    let rating = parseInt(spot.avgRating).toFixed(1)
    if(isNaN(rating)){
        rating = 'New'
    }

    return(
        <div className='tile'>
            <NavLink to={`/spots/${spot.id}`} className='spot-tile'>
                <img src={`${spot.previewImage}`} alt={`${spot.name}`} className='spot-img'/>
                <div className='spot-text'>
                    <div className ='spot-location-rating'>
                        <p className='spot-location'>{`${spot.city}, ${spot.state}`}</p>
                        <p className='spot-rating'>{`${rating}`}</p>
                    </div>
                    <p className='spot-price'>{`$${spot.price}`} night</p>
                </div>
            </NavLink>
        </div>
    )
};

export default SpotTile;
