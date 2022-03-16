import { csrfFetch } from './csrf';

const LOAD_ALL = 'booking/loadAll';
const LOAD_ONE ='booking/lostOne';
const ADD_ONE ='booking/addOne'
const DELETE_ONE ='booking/deleteOne'

// ACTIONS 

const loadAll = (list) => ({
    type: LOAD_ALL,
    list
})

// const loadOne = (booking) => ({
//     type: LOAD_ONE,
//     booking
// })

const addOneBooking = booking => ({
    type: ADD_ONE,
    booking
})

// const deleteOneBooking = (bookingId) => {
//     return {
//         type: DELETE_ONE,
//         bookingId
//     }
// }

// THUNKS 

export const getAllBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(loadAll(bookings));
    }
};

// export const getOneSpot = (id) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`)

//     if (response.ok) {
//         const spot = await response.json()
//         dispatch(loadOne(spot))
//     }
// }

export const addBooking = (bookingDetails) => async dispatch => {

    const res = await csrfFetch(`/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails)
    });
    if (!res.ok) {
        let error = await res.json();
        return error;
    }

    const payload = await res.json();
    console.log(payload, "thunk")
    await dispatch(addOneBooking(payload));
    return payload;
}

// export const editSpot = (spot, id) => async dispatch => {
//     const res = await csrfFetch(`/api/spots/${id}/host`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(spot)
//     });
//     if (!res.ok) {
//         let error = await res.json();
//         return error;
//     }
//     const payload = await res.json();
//     await dispatch(addOneSpot(payload));

//     return payload;
// }

// export const deleteSpot = (payload, id) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${id}`, {
//         method: "DELETE",
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload, id)
//     });

//     if (response.ok) {
//         const spot = await response.json();

//         await dispatch(deleteOneSpot(spot));
//         return spot;
//     }
// }

//REDUCER 
const initialState = {
    list: [],
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL: {
            const getAllBookings = {}
            action.list.forEach(booking => {
                getAllBookings[booking.id] = booking
            });
            return {
                ...getAllBookings,
                ...state.list,
                list: action.list
            }
        }
        // case LOAD_ONE: {
        //     const newState = {
        //         ...state,
        //         [action.spot.id]: action.spot
        //     };
        //     return newState;
        // }
        // case ADD_ONE: {
        //     if (!state[action.spot.id]) {
        //         const newState = {
        //             ...state,
        //             [action.spot.id]: action.spot
        //         };
        //         const spotList = newState.list.map(id => newState[id]);
        //         spotList.push(action.spot);
        //         newState.list = action.list;
        //         return newState;
        //     }
        //     return {
        //         ...state,
        //         [action.spot.id]: {
        //             ...state[action.spot.id],
        //             ...action.spot
        //         }
        //     }
        // }
        // case DELETE_ONE: {
        //     const newState = { ...state };
        //     delete newState[action.spotId];
        //     return newState;
        // }
        // case DELETE_ONE: {
        //     return {
        //         ...state,
        //         [action.spotId]: {
        //             ...state[action.spotId],
        //             list: state[action.spotId].list.filter(
        //                 (spot) => spot.id !== action.spotId
        //             ),
        //         },
        //     };
        // }
        default:
            return state;
    }
};

export default bookingReducer;