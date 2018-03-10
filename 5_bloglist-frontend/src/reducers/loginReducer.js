import loginService from './../services/login'
import blogService from './../services/blogs'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user
        case 'LOGOUT':
            return null
        default:
            return state
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({
                username,
                password
            })
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            dispatch({
                type: 'LOGIN',
                user
            })
            dispatch({
                type: 'NOTIFY',
                notification: `welcome ${user.name}`,
                error: false
            })
        } catch (exception) {
            dispatch({
                type: 'NOTIFY',
                notification: 'incorrect login information',
                error: true
            })
        }

    }
}

export const logout = () => {
    return (dispatch) => {
        window.localStorage.removeItem('loggedBlogAppUser')
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const setUser = (user) => {
    return (dispatch) => {
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            user
        })
    }
}

export default loginReducer