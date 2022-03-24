import { csrfFetch } from './csrf';

const LOAD_ALL = 'users/loadAll';
const LOAD_ONE = 'user/lostOne';


// ACTIONS 

const loadAll = (list) => ({
    type: LOAD_ALL,
    list
})

const loadOne = (user) => ({
    type: LOAD_ONE,
    user
})


// THUNKS 

export const getAllUsers = () => async dispatch => {
    const response = await csrfFetch(`/api/users/all`);

    if (response.ok) {
        const users = await response.json();
        dispatch(loadAll(users));
    }
};

export const getOneUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/users/${userId}`)

    if (response.ok) {
        const user = await response.json()
        dispatch(loadOne(user))
    }
}


//REDUCER 
const initialState = {
    list: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL: {
            const allUsers = {}
            action.list.forEach(user => {
                allUsers[user.id] = user
            });
            return {
                ...allUsers,
                ...state,
                list: action.list
            }
        }
        case LOAD_ONE: {
            const newState = {
                ...state,
                [action.user.id]: action.user
            };
            return newState;
        }
       
        default:
            return state;
    }
};

export default userReducer;