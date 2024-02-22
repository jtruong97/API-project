//import { csrfFetch } from "./csrf";

const VIEW_REVIEWS = '/reviews/viewReviews'

const viewReview = (reviews) => {
    return{
        type: VIEW_REVIEWS,
        reviews
    }
}

//Thunks
export const getReviews = (spotId) => async(dispatch) =>{
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const data = await response.json();
        dispatch(viewReview(data))
    }

}


//reducer
function reviewReducer (state ={}, action){
    switch(action.type){
        case VIEW_REVIEWS: {
            const viewState = {...state}
            action.reviews.Reviews.forEach(review => {
                viewState[review.id] = review
            })
            return viewState;
        }
    default:
        return state;
    }
}

export default reviewReducer;
