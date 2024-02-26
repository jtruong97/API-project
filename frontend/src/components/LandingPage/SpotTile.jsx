import { NavLink } from "react-router-dom";

const SpotTile = ({ spot }) => {
    //console.log('spot',spot)
    let rating = parseFloat(spot.avgRating).toFixed(1)
    if(isNaN(rating)){
        rating = 'New'
    }

    return(
        // <div className='tile'>
        //     <NavLink to={`/spots/${spot.id}`} className='spot-tile'>
        //         <div className='tooltip'><span className="tooltiptext">{spot.name}</span></div>
        //         <img src={`${spot.previewImage}`} alt={`${spot.name}`} className='spot-img'/>
        //         <div className='spot-text'>
        //             <div className ='spot-location-rating'>
        //                 <p className='spot-location'>{`${spot.city}, ${spot.state}`}</p>
        //                 <div className='rating-container'>
        //                     <img className='stardrop'src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop' />
        //                     <p className='spot-rating'>{`${rating}`}</p>
        //                 </div>
        //             </div>
        //             <p className='spot-price'>{`$${spot.price}`} night</p>
        //         </div>
        //     </NavLink>
        // </div>
        <div className='tile'>
        <NavLink to={`/spots/${spot.id}`} className='spot-tile'>
            <div className='image-container'>
                <img src={`${spot.previewImage}`} alt={`${spot.name}`} className='spot-img'/>
                <div className='tooltip'><span className="tooltiptext">{spot.name}</span></div>
            </div>
            <div className='spot-text'>
                <div className ='spot-location-rating'>
                    <p className='spot-location'>{`${spot.city}, ${spot.state}`}</p>
                    <div className='rating-container'>
                        <img className='stardrop'src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop' />
                        <p className='spot-rating'>{`${rating}`}</p>
                    </div>
                </div>
                <p className='spot-price'>{`$${spot.price}`} night</p>
            </div>
        </NavLink>
    </div>
    )
};

export default SpotTile;
