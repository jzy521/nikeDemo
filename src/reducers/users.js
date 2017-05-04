import {ADDUSER, REMOVEUSER, EDITUSER} from '../constants'

const initialState = [{
    id: new Date().getTime(), firstName: 'Peter', lastName: 'Jin',
    hobbies: {
        basketball: false,
        football: true,
        soccer: false
    }
}];

const addUser = (state, action) => {
    if (action.type === ADDUSER) {
        return {
            id: new Date().getTime(),
            firstName: action.user.firstName,
            lastName: action.user.lastName,
            hobbies: action.user.hobbies
        };
    } else {
        return state;
    }

}

const removeUser = (state, action) => {
    if (action.type === REMOVEUSER) {
       let userId = action.id;
        state = state.filter((user) => {
            return user.id !== userId;
        });
        return state;
    } else {
        return state;
    }
}

const editUser = (state, action) => {
    if(action.type === EDITUSER){
       return state.map((user) => {
            if(user.id === action.user.id){

               let newUser = Object.assign({}, user, {
                    firstName : action.user.firstName,
                    lastName : action.user.lastName,
                    hobbies : action.user.hobbies
                })
                return newUser;
            }else
                return user;
        })

    }else {
        return state;
    }
}

const users = (state = initialState, action) => {
    switch (action.type) {
        case ADDUSER:
            return [
                ...state,
                addUser(undefined, action)
            ];
        case EDITUSER:
            return  editUser(state,action);
        case REMOVEUSER:
            return removeUser(state, action);
        default:
            return state;
    }
}

export default users;