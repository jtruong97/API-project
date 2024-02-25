import { PiStarDuotone } from "react-icons/pi";
import { useState } from "react";
import './StarRating.css'

const StarRating = ({rating, starClick}) => {
    const [onhover, setonHover] = useState(0);

    const starHover = (star) => {
        setonHover(star);
    }

    let stars = [1,2,3,4,5]
    return(
        <div className='star-container'>
        {stars.map(star => (
            <span
                key={star}
                className={(star <= rating || star <= onhover)? 'filled' : 'empty'}
                onMouseEnter={()=> starHover(star)}
                onMouseLeave={()=> starHover(0)}
                onClick={() => starClick(star)}
            >
                    <PiStarDuotone/>
            </span>
        ))}
        <span className='star-text'>Stars</span>
        </div>
    )
}

export default StarRating;
