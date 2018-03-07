
let timer = null

const notificationReducer = (store = '', action) => {
    switch (action.type) {
        case 'ADDED':
            return `you have created ${action.content}`
        case 'VOTED':
            return `you have voted ${action.content}`
        case 'CLEAR':
            return ''
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

export const clearNotification = (timer) => {
    //console.log(timer)
    return {
        type: 'CLEAR'
    }
}

export default notificationReducer