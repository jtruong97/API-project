

// types
//const VIEW_ALL_SPOTS = '/spot/allSpots'
const VIEW_SPOT = '/spot/spotId'

// const viewAllSpot = (spot) => {
//     return {
//         type: VIEW_ALL_SPOTS,
//         payload: spot
//     }
// }

// export const viewAllSpots = async () => {
//     const response = await fetch(`/api/spots`)
//     const data = await response.json();
//     if(!response.ok){
//         throw new Error('Could not fetch spots')
//     }
//     if(data && data.Spots){
//         dispatch()
//     }
// }

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
        throw new Error ('Could not fetch spot by spotId')
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
