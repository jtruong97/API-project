

// types
//const VIEW_ALL_SPOTS = '/spot/allSpots'
const VIEW_SPOT = '/spot/spotId'

//const viewAllSpots = (spot)

//action: view spot by spot id
const viewSpot = (spot) => {
    return {
        type: VIEW_SPOT,
        payload: spot
    }
}

export const fetchSpecificSpot = (spotId) => async(dispatch) =>{
    const response = await fetch(`/api/spots/${spotId}`)
    if(!response.ok){
        throw new Error ('')
    }
    const data = await response.json();
    dispatch(viewSpot(data));
}

//reducer
function spotReducer (state={}, action){
    switch(action.type){
        case VIEW_SPOT:
            const newState= {...state, spot: action.payload}
            return newState
        default:
            return state;
    }
}

export default spotReducer;
