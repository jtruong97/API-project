import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview } from '../../store/reviews';
import { useNavigate } from 'react-router-dom';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({reviewId, spotId, renderDelete}) => {
    console.log(reviewId,'REVIEW ID')
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const nav = useNavigate();

    const deleteReviews = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId))
        renderDelete() //triggers rerender
        closeModal()
        nav(`/spots/${spotId}`)
    }

    return(
        <>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot from the listings?</p>
            <button onClick={deleteReviews}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
        </>
    )
}

export default DeleteReviewModal;
