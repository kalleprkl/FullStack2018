
const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (notification, error) => {
  return {
    content: notification,
    error,
    id: getId()
  }
}

const notificationReducer = (state = [], action) => {
    switch (action.type) {
        case 'NOTIFY':
            return [...state, asObject(action.notification, action.error)]
        case 'CLEAR':
            return state.splice(1)
        default:
            return state
    }
}

export const notify = (notification, error) => {
    return (dispatch) => {
        dispatch({
            type: 'NOTIFY',
            notification,
            error
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, 5000)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer