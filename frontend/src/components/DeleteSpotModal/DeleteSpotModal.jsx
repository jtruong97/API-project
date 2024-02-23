import { useDispatch } from 'react-redux';
import { deleteExistingSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './DeleteSpotModal.css'

function DeleteModal({spot}) {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { closeModal } = useModal();
    const [spotDeleted, setSpotDeleted] = useState(false);

    const deleteSpot = async (e) => {
        e.preventDefault();
        await dispatch(deleteExistingSpot(spot.id))
        .then(closeModal)
        .then(setSpotDeleted(true))
        nav('/spots/current')
    }
    if(spotDeleted){
        return;
    }

    return(
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listing?</p>
            <button onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteModal;
