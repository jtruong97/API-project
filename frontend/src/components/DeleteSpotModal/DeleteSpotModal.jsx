import { useDispatch } from 'react-redux';
import { deleteExistingSpot } from '../../store/spots';
import { useModal } from '../../context/Modal';
import { useNavigate } from 'react-router-dom';
import './DeleteSpotModal.css'

function DeleteModal({spot, renderSpot}) {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { closeModal } = useModal();

    const deleteSpot = async (e) => {
        e.preventDefault();
        await dispatch(deleteExistingSpot(spot.id))
        closeModal()
        renderSpot()
        nav('/spots/current')
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
