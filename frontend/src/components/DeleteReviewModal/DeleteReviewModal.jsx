import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview } from '../../store/reviews';
import './DeleteReviewModal.css'

const DeleteReviewModal = ({reviewId}) => {
    console.log(reviewId,'REVIEW ID')
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteReviews = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(reviewId))
        .then(closeModal)
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
