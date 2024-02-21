import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import DeleteModal from "../DeleteSpotModal/DeleteSpotModal";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import './ManageSpot.css'

const ManageSpot = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => {
        return state.session.user
    })
   const userId = user.id;

   useEffect(()=> {
    dispatch(fetchAllSpots())
   },[dispatch])

   const spots = useSelector(state => {
    return state.spotsState
   })
   let spotArr = Object.values(spots)
   spotArr = spotArr.filter(spot => spot.ownerId == userId) //new Arr with only current owners spots

    const nav = useNavigate();
    const navToCreate = () => {
        nav('/spots/new')
    }
    const navToUpdate = () => {
        nav('/')
    }

    return(
        <>
            <h1>Manage Spots</h1>
            <button onClick={navToCreate}>Create a New Spot</button>
            <div className='cur-spot-container'>
                {spotArr.map(spot => (
                    <>
                    <NavLink to={`/spots/${spot.id}`}>
                    <img key={spot.id} src={`${spot.previewImage}`} alt={spot.name}/>
                        <div className='text-blow-img-container'>
                            <p>{spot.city}, {spot.state}</p>
                            <div className='curr-rating-container'>
                                <img src='https://i.postimg.cc/D0SVzkzk/image-removebg-preview.png' alt='stardrop'/>
                                <p>{isNaN(spot.avgRating) ? 'New' : (parseInt(spot.avgRating).toFixed(1))}</p>
                            </div>
                            <p>${spot.price} night</p>
                        </div>
                    </NavLink>
                    <div className='update-delete-container'>
                        <button onClick={navToUpdate}>Update</button>
                        <button className='delete-button'>
                            <OpenModalMenuItem
                                itemText="Delete"
                                modalComponent={<DeleteModal spot={spot}/>}
                            />
                        </button>
                    </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default ManageSpot;
