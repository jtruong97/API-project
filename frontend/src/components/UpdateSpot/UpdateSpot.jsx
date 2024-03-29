import { useDispatch, useSelector } from "react-redux"
import CreateSpot from "../CreateSpot/CreateSpot";
import { useParams } from "react-router-dom";
import { fetchSpecificSpot } from "../../store/spots";
import { useEffect } from "react";
import './UpdateSpot.css'

const UpdateSpot = () => {
    const dispatch = useDispatch();
    const {spotId} = useParams();

    const spots = useSelector(state => {return state.spotsState})
    const currSpot =spots[spotId] //current spot obj

    useEffect(()=>{
        dispatch(fetchSpecificSpot(spotId))
    },[spotId, dispatch])

    let buttonName = 'Update Spot'

    return(
        <>
            <h1 className='form-header'>Update your Spot</h1>
            <CreateSpot spot={currSpot} buttonName={buttonName}/>
        </>
    )
}

export default UpdateSpot;
