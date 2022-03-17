import { csrfFetch } from './csrf';

const LOAD_ALL = 'review/loadAll';
const LOAD_ONE = 'review/lostOne';
const ADD_ONE = 'review/addOne'
const DELETE_ONE = 'review/deleteOne'

// ACTIONS 

const loadAll = (spotId) => ({
    type: LOAD_ALL,
    list: spotId
})

const loadOne = (review) => ({
    type: LOAD_ONE,
    review
})

const addOneReview = review => ({
    type: ADD_ONE,
    review
})

const deleteOneReview = (reviewId) => {
    return {
        type: DELETE_ONE,
        reviewId
    }
}

// THUNKS ----------------------------------------------------------------------
export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${spotId}`);

    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadAll(reviews));
    }
};

export const getOneReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`)

    if (response.ok) {
        const review = await response.json()
        dispatch(loadOne(review))
    }
}

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

export const editReview = (review, reviewId) => async dispatch => {
    console.log(review, reviewId)
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review)
    });
    if (!res.ok) {
        let error = await res.json();
        return error;
    }
    const payload = await res.json();
    await dispatch(addOneReview(payload));

    return payload;
}

export const deleteReview = (reviewId) => async (dispatch) => {
    console.log(reviewId, "thunk")
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'delete'
    })

    if (response.ok) {
        const review = await response.json();
        console.log(review.id, "deleted reviewID")
        await dispatch(deleteOneReview(review.id));
        return review;
    }
}

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
        case LOAD_ONE: {
            const newState = {
                ...state,
                [action.review.id]: action.review
            };
            return newState;
        }
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
        case DELETE_ONE: {
            const newState = { ...state };
            delete newState[action.reviewId];
            return newState;
        }

        default:
            return state;
    }
};

export default reviewsReducer;