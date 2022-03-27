import { csrfFetch } from './csrf';

const LOAD_ALL = 'booking/loadAll';
const ADD_ONE ='booking/addOne'
const DELETE_ONE ='booking/deleteOne'

// ACTIONS 
const loadAll = (list) => ({
    type: LOAD_ALL,
    list
})

const addOneBooking = booking => {
    return {
    type: ADD_ONE,
    booking: booking
}
}

const deleteOneBooking = (bookingId) => {
    return {
        type: DELETE_ONE,
        bookingId
    }
}

// THUNKS 
export const getAllBookings = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/`);

    if (response.ok) {
        const bookings = await response.json();
        dispatch(loadAll(bookings));
    }
};

export const addBooking = (bookingDetails) => async dispatch => {
    const res = await csrfFetch(`/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingDetails)
    });
    if (res.ok) {
        const payload = await res.json();
        await dispatch(addOneBooking(payload));
        return payload;
    } else {

        let error = await res.json();
        return error;
    }
    }
    

export const editBooking = (bookingPayload, bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
    });
    if (!res.ok) {
        let error = await res.json();
        return error;
    }
    const payload = await res.json();
    await dispatch(addOneBooking(payload));

    return payload;
}

export const deleteBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        const booking = await response.json();

        await dispatch(deleteOneBooking(booking.id));
        return booking.message;
    }
}

//REDUCER 
const initialState = {
    list: [],
};

const bookingReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {
        case LOAD_ALL: {
            return {
                ...state,
                list: [...action.list]
            }
        }
        case ADD_ONE: {
            return {
                ...state,
                list: [...state.list, action.booking]
            }
        }
        case DELETE_ONE: {
            newState = { ...state }
            delete newState[action.bookingId]
            return newState
        }

        default: return state
    }
};

export default bookingReducer;