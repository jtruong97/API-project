import { csrfFetch } from "./csrf";

// types
const VIEW_ALL_SPOTS = '/spot/allSpots'
const VIEW_SPOT = '/spot/viewSpot'
const UPDATE_SPOT = 'spot/updateSpot'
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
    return {
        type: DELETE_SPOT,
        spotId
    }
}


const updateSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}


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
        body: JSON.stringify(spot)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(viewSpot(data.id))

        spot.SpotImages.map(img => {
            csrfFetch(`/api/spots/${data.id}/images`, {
                method: 'POST',
                body: JSON.stringify({
                    url: img.url
                })
            })
        })
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
        dispatch(deleteSpot(data.spotId))
    }
}

//delete imgs
// const deleteImgs = async (imgs) => {
//     const response = await imgs.map(img => {
//         csrfFetch(`/api/spot-images/${img.id}`, {
//             method: 'DELETE'
//         })
//     })
//     if(response.ok){
//         await Promise.all(response)
//     }
// }

//update spot
export const updateExistingSpot = (newSpot, preSpot) => async (dispatch) => {
    // console.log(spot,'SPOT HERE!!!!!!!')
    // spot.SpotImages.map(img => {
    //     console.log(Object.values(img), 'img here')
    // })
    // // let count = [0,1,2,3,4]
    // // count.map(num => {
    // //     delete spot.SpotImages[num]
    // // })
    // let deleteImgs = spot.SpotImages.map(img => { //delete exisiting imgs
    //     console.log(img,'IMG HERE')
    //     return csrfFetch(`/api/spot-images/${img.id}`,{
    //         method:'DELETE'
    //     })
    // })
    //await Promise.all(deleteImgs)
    console.log(newSpot, 'new spot')
    const response = await csrfFetch(`/api/spots/${preSpot.id}`, {
        method: 'PUT',
        body: JSON.stringify(newSpot)
   })
    if(response.ok){
        const data = await response.json();
        dispatch(updateSpot(data))

        if(preSpot.SpotImages) {
            preSpot.SpotImages.forEach(async(img) => {
                await csrfFetch(`/api/spot-images/${img.id}`, {
                    method: 'DELETE'
                })
            })
            newSpot.SpotImages.map(img => {
                csrfFetch(`/api/spots/${data.id}/images`, {
                    method: 'POST',
                    body: JSON.stringify({
                        url: img.url
                    })
                })
            })
        }

        return data;
    }
    if(!response.ok){
        console.error('Error, could not update spot')
    }
}
// export const updateExistingSpot = (spot, spotId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'PUT',
//         body: JSON.stringify(spot)
//     });

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(updateSpot(data));

//         if (spot.SpotImages && spot.SpotImages.length > 0) {
//             let images = await Promise.all(spot.SpotImages.map(async (img) => {
//                 return csrfFetch(`/api/spots/${data.id}/images`, {
//                     method: 'POST',
//                     body: JSON.stringify({
//                         url: img.url
//                     })
//                 });
//             }));
//             console.log('IMAGES', images)
//         }

//         return data;
//     }

//     if (!response.ok) {
//         console.error('Error, could not update spot');
//     }
// }


//reducer
function spotReducer (state={}, action){
    switch(action.type){
        case VIEW_ALL_SPOTS: {
            const newState = {};
            action.payload.Spots.forEach(spot => {
                newState[spot.id] = spot
            })
            return newState;
        }
        case VIEW_SPOT:
            return {...state, [action.spot.id]: action.spot}
        case DELETE_SPOT:{
            const deletestate = {...state};
            delete deletestate[action.spotId]
            return deletestate
        }
        case UPDATE_SPOT:
            return {...state, [action.spot.id]:[action.spot]}
        default:
            return state;
    }
}

export default spotReducer;
