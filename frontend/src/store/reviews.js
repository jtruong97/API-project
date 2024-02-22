import { csrfFetch } from "./csrf"

const VIEW_REVIEWS = '/reviews/viewReviews'
const CREATE_REVIEW = '/review/createReview'

const viewReview = (reviews) => {
    return{
        type: VIEW_REVIEWS,
        reviews
    }
}

const createReviewAction = (review) =>{
    return{
        type: CREATE_REVIEW,
        review
    }
}

//Thunks
//get reviews
export const getReviews = (spotId) => async(dispatch) =>{
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const data = await response.json();
        dispatch(viewReview(data))
    }

}
//create review
export const createReview = (review,spotId) => async(dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method:'POST',
        body: JSON.stringify(review)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(createReviewAction(data))
        dispatch(viewReview(spotId)) //added to rerender page afer creation
        return data;
    }
    if(!response.ok){
        throw new Error('Error creating new review')
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
        case CREATE_REVIEW: {
            return {...state, [action.review.id]: action.review}
        }
    default:
        return state;
    }
}

export default reviewReducer;
