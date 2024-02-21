import { useDispatch } from 'react-redux';
import { deleteExistingSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import './DeleteSpotModal.css'
import { useNavigate } from 'react-router-dom';

function DeleteModal({spot}) {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { closeModal } = useModal();

    const deleteSpot = async (e) => {
        e.preventDefault();
        await dispatch(deleteExistingSpot(spot.id))
        .then(closeModal)
        .then(nav('/spots/current'))
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
