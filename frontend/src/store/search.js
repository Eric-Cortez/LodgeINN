import { csrfFetch } from './csrf';

const LOAD_ALL = 'search/loadAll';

// ACTIONS 

const loadAll = (list) => ({
    type: LOAD_ALL,
    list
})

// THUNKS 

export const getAllSearchRes = (searchQuery) => async dispatch => {
    const response = await csrfFetch(`/api/search/${searchQuery}`);
    
    if (response.ok) {
        const res = await response.json();
    
        dispatch(loadAll(res));
    }
};



//REDUCER 
const initialState = {
    list: [],
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL: {
            const allRes= {}
            action.list.forEach(eachRes => {
                allRes[eachRes.id] = eachRes
            });
            return {
                ...allRes,
                ...state.list,
                list: action.list
            }
        }
        default:
            return state;
    }
};

export default searchReducer;