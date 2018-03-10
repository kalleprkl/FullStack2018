import userServive from './../services/users'

const userReducer = (state = [], action) => {
    switch (action.type) {
        case 'USER_INIT':
            return action.users
        default:
            return state
    }
}

export const usersInitialize = () => {
    return async (dispatch) => {
        const users = await userServive.getAll()
        dispatch({
            type: 'USER_INIT',
            users
        })
    }
}

export default userReducer