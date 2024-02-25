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
        <div className='delete-spot-form'>
            <h1 className='delete-spot-header'>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listing?</p>
            <button className='delete-spot-btn' onClick={deleteSpot}>Yes (Delete Spot)</button>
            <button className='dont-delete-spot-btn' onClick={closeModal}>No (Keep Spot)</button>
        </div>
    )
}

export default DeleteModal;
