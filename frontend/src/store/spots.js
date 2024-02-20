import { csrfFetch } from "./csrf";

// types
const VIEW_SPOT = '/spot/viewSpot'
//const UPDATE_SPOT = 'spot/updateSpot'
//const DELETE_SPOT = 'spot/deleteSpot'

//action: view spot by spot id
const viewSpot = (spot) => {
    return {
        type: VIEW_SPOT,
        payload: spot
    }
}

// const deleteSpot = (spotId) => {
//     return{
//         type: DELETE_SPOT,
//         spotId
//     }
// }

// const updateSpot = (spot) => {
//     return {
//         type: UPDATE_SPOT,
//         payload: spot
//     }
// }


//action creaters
//spot details
export const fetchSpecificSpot = (spotId) => async(dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if(!response.ok){
        throw new Error ('Error: Could not fetch spot by spotId')
    }
    const data = await response.json();
    dispatch(viewSpot(data));
}

//create new spot
export const createNewSpot = (spot) => async(dispatch) => {
    const {country, address, city, state, lat, lng, description, name, price, previewImage, img1, img2, img3, img4} = spot //destructure the values
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            country, address, city, state, lat, lng, description, name, price, previewImage, img1, img2, img3, img4

        })
    })
    if(response.ok){
        const data = await response.json();
        dispatch(viewSpot(data.spot))
        return data;
    }
}
//delete spot
export const deleteExistingSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        const data = await response.json();
        dispatch(delete(data.spotId))
    }
}

//reducer
function spotReducer (state={}, action){
    switch(action.type){
        case VIEW_SPOT:
            return {...state, spot: action.payload}
        // case UPDATE_SPOT:
        //     const updateState= {...state}
        // case DELETE_SPOT:
        //     const newState = {...state}
        //     delete newState[action.spotId]
        //     return newState
        default:
            return state;
    }
}

export default spotReducer;
