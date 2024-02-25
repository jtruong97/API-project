import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview } from '../../store/reviews';
import { useNavigate } from 'react-router-dom';
import { fetchSpecificSpot } from '../../store/spots';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({reviewId, spotId, renderDelete}) => {
    //console.log(reviewId,'REVIEW ID')
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const nav = useNavigate();

    const deleteReviews = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId))
        await dispatch(fetchSpecificSpot(spotId))
        renderDelete() //triggers rerender
        closeModal()
        nav(`/spots/${spotId}`)
    }

    return(
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={deleteReviews}>Yes (Delete Review)</button>
            <button onClick={closeModal}>No (Keep Review)</button>
        </>
    )
}

export default DeleteReviewModal;
