const notificationReducer = (store = [], action) => {
    switch (action.type) {
        case 'ADDED':
            return [...store, `you have created "${action.content}"`]
        case 'VOTED':
            return [...store, `you have voted "${action.content}"`]
        case 'CLEAR':
            return store.splice(1)
        default:
            return store
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