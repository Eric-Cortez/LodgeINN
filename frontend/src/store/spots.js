import { csrfFetch } from './csrf';

const LOAD_ALL = 'spots/loadAll';

// ACTIONS 

const loadAll = ( list ) => ({
    type: LOAD_ALL,
    list
})

// THUNKS 

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAll(spots));
    }
};


//REDUCER 
const initialState = { 
    list : [],
 };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL: {
            const allSpots = {}
            action.list.forEach(spot => {
                allSpots[spot.id] = spot
            });
            return{
                ...allSpots,
                ...state.list, 
                list: action.list
            }
        }
        default:
            return state;
    }
};

export default spotsReducer;