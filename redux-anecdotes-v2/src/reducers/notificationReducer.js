const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (notification) => {
  return {
    content: notification,
    id: getId()
  }
}

const notificationReducer = (store = [], action) => {
    switch (action.type) {
        case 'NOTIFY':
            return  [...store, asObject(action.notification)]
        case 'ADDED':
            const newAdded = asObject(`you have created "${action.content}"`)
            return [...store, newAdded]
        case 'VOTED':
            const newVoted = asObject(`you have voted "${action.content}"`)
            return [...store, newVoted]
        case 'CLEAR':
            return store.splice(1)
        default:
            return store
    }
}

export const notify = (notification, timer) => {
    return (dispatch) => {
        dispatch({
            type: 'NOTIFY',
            notification
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, timer * 1000)
    }
}

export const notifyCreated = (content) => {
    return {
        type: 'ADDED',
        content
    }
}

export const notifyVoted = (content) => {
    return {
        type: 'VOTED',
        content
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer