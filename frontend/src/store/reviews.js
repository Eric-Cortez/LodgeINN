import { csrfFetch } from './csrf';

const LOAD_ALL = 'review/loadAll';
// const LOAD_ONE = 'spot/lostOne';
const ADD_ONE = 'review/addOne'
// const DELETE_ONE = 'spot/deleteOne'

// ACTIONS 

const loadAll = (spotId) => ({
    type: LOAD_ALL,
    list: spotId
})

// const loadOne = (spot) => ({
//     type: LOAD_ONE,
//     spot
// })

const addOneReview = review => ({
    type: ADD_ONE,
    review
})

// const deleteOneSpot = (spotId) => {
//     return {
//         type: DELETE_ONE,
//         spotId
//     }
// }

// THUNKS ----------------------------------------------------------------------
export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${spotId}`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAll(reviews));
    }
};

// export const getOneSpot = (id) => async dispatch => {
//     const response = await csrfFetch(`/api/spots/${id}`)

//     if (response.ok) {
//         const spot = await response.json()
//         dispatch(loadOne(spot))
//     }
// }

export const addReview = (payload) => async dispatch => {
    const res = await csrfFetch(`/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    if (!res.ok) {
        let error = await res.json();
        return error;
    }

    const review = await res.json();
    await dispatch(addOneReview(review));

    return review;
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

//REDUCER----------------------------------------------------------------------- 
const initialState = {
    list: [],
};

const reviewsReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case LOAD_ALL: {
            const allReviews = {}
            action.list.forEach(review => {
                allReviews[review.id] = review
            });
            return {
                ...allReviews,
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
        case ADD_ONE: {
            if (!state[action.review.id]) {
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                };
                const reviewList = newState.list.map(id => newState[id]);
                reviewList.push(action.review);
                newState.list = action.list;
                return newState;
            }
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review
                }
            }
        }
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

export default reviewsReducer;