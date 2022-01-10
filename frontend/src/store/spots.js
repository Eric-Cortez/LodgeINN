import { csrfFetch } from './csrf';

const LOAD_ALL = 'spots/loadAll';
const LOAD_ONE = 'spot/lostOne';
const ADD_ONE = 'spot/addOne'

// ACTIONS 

const loadAll = ( list ) => ({
    type: LOAD_ALL,
    list
})

const loadOne = (id) => ({
    type: LOAD_ONE,
    id
})

const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
})

// THUNKS 

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
        const spots = await response.json();
        dispatch(loadAll(spots));
    }
};

export const getOneSpot = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`) 

    if(response.ok) {
        const spot = await response.json()
        // console.log("THUNK",spot)
        dispatch(addOneSpot(spot))
    }
}

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
        case ADD_ONE: {
            if(!state[action.spot.id]){
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                const spotList = newState.list.map(id => newState[id]);
                console.log(spotList)
                spotList.push(action.spot);
                newState.list = action.list;
                return newState;
            }
            return { 
                ...state,
                [action.spot.id]:{
                    ...state[action.spot.id],
                    ...action.spot
                }
            }
        }
        default:
            return state;
    }
};

export default spotsReducer;