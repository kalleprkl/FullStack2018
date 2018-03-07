const filterReducer = (store = '', action) => {
    switch (action.type) {
        case 'UPDATE':
            return action.content
        case 'CLEAR':
            return ''
        default:
            return store
    }
}

export default filterReducer 