import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import DeleteModal from "../DeleteSpotModal/DeleteSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './ManageSpot.css'

const ManageSpot = () => {
    const user = useSelector(state => {return state.session.user})
    const spots = useSelector(state => {return state.spotsState})
    const dispatch = useDispatch();
    const userId = user.id;

    const [postSpot, setPostSpot] = useState(false)

    const renderSpot = () => {
        setPostSpot(curr => !curr)
    }

   useEffect(()=> {
    dispatch(fetchAllSpots())
   },[dispatch, postSpot])

   let spotArr = Object.values(spots)
   spotArr = spotArr.filter(spot => spot.ownerId == userId) //new Arr with only current owners spots

    const nav = useNavigate();
    const navToCreate = () => {
        nav('/spots/new')
    }

    return(
        <>
            <h1 className='manage-spots-header'>Manage Spots</h1>
            {/* <button className='curr-create-spot-btn'onClick={navToCreate}>Create a New Spot</button> */}
            {spotArr.length == 0 && (<button className='curr-create-spot-btn' onClick={navToCreate}>Create a New Spot</button>)}
            <div className='cur-spot-container'>
                {spotArr.map(spot => (
                    <div className='each-curr-spot-container'>
                    <NavLink className='curr-navLinks' to={`/spots/${spot.id}`}>
                    <div className='curr-img-container'>
                        <img key={spot.id} src={`${spot.previewImage}`} alt={spot.name} className='manage-spot-img'/>
                    </div>
                        <div className='text-blow-img-container'>
                            <div className="curr-location-rating-container">
                                <p className='curr-city-state'>{spot.city}, {spot.state}</p>
                                <div className='curr-rating-container'>
                                    <img className ='curr-stardrop-img'src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop'/>
                                    <p>{isNaN(spot.avgRating) ? 'New' : (parseInt(spot.avgRating).toFixed(1))}</p>
                                </div>
                            </div>
                            <p className='curr-price-container'>${spot.price} night</p>
                        </div>
                    </NavLink>
                    <div className='update-delete-container'>
                        <button className='update-button'><NavLink className='update-button-link' to={`/spots/${spot.id}/edit`}>Update</NavLink></button>
                        <button className='delete-button'>
                            <OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteModal spot={spot} renderSpot={renderSpot}/>}
                            />
                        </button>
                    </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ManageSpot;
