import { csrfFetch } from './csrf';

const LOAD_ALL = 'spots/loadAll';
const LOAD_ONE = 'spot/lostOne';
const ADD_ONE = 'spot/addOne'

// ACTIONS 

const loadAll = ( list ) => ({
    type: LOAD_ALL,
    list
})

const loadOne = (spot) => ({
    type: LOAD_ONE,
    spot
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
        dispatch(loadOne(spot))
    }
}

export const addSpot = ( spot ) => async dispatch => {
         const res = await csrfFetch(`/api/spots/host`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify(spot)
        });
        if (!res.ok) {
            let error = await res.json();
            return error; 
        }

        const payload = await res.json();
        console.log("addSpot THUNK",payload)
        await dispatch(addOneSpot(payload)); 
        
        return payload;
}

//REDUCER 
const initialState = { 
    list : [],
 };

const spotsReducer = (state = initialState, action) => {
    console.log(action)
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
        case LOAD_ONE: {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
            return newState;
        }
        case ADD_ONE: {
            console.log("STATE",state)
            if(!state[action.spot.id]){
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                };
                console.log("New State",newState)
                const spotList = newState.list.map(id => newState[id]);
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