import { csrfFetch } from "./csrf";

// types
const VIEW_ALL_SPOTS = '/spot/allSpots'
const VIEW_SPOT = '/spot/viewSpot'
//const UPDATE_SPOT = 'spot/updateSpot'
const DELETE_SPOT = 'spot/deleteSpot'

//action: view spot by spot id
const viewAllSpots = (spots) => {
    return {
        type: VIEW_ALL_SPOTS,
        payload: spots
    }
}

const viewSpot = (spot) => {
    return {
        type: VIEW_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return{
        type: DELETE_SPOT,
        spotId
    }
}

// const updateSpot = (spot) => {
//     return {
//         type: UPDATE_SPOT,
//         payload: spot
//     }
// }


//action creaters
// all spots
export const fetchAllSpots = () => async(dispatch) => {
    const response = await fetch(`/api/spots`)
    if(response.ok){
        const data = await response.json();
        dispatch(viewAllSpots(data));
    }
}

//spot details
export const fetchSpecificSpot = (spotId) => async(dispatch) =>{
    const response = await csrfFetch(`/api/spots/${spotId}`)
    if(response.ok){
        const data = await response.json();
        dispatch(viewSpot(data));
    }
}

//create new spot
export const createNewSpot = (spot) => async(dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            spot
        })
    })
    if(response.ok){
        const data = await response.json();
        dispatch(viewSpot(data))
        return data;
    }
    if(!response.ok){
        throw new Error('Error creating new spot')
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
        case VIEW_ALL_SPOTS:
            let newState = {}
            action.payload.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState;
        case VIEW_SPOT:
            return {...state, [action.spot.id]: action.spot}
        // case UPDATE_SPOT:
        //     const updateState= {...state}
        case DELETE_SPOT:
            const deletestate = {...state}
            delete deletestate[action.spotId]
            return deletestate
        default:
            return state;
    }
}

export default spotReducer;
