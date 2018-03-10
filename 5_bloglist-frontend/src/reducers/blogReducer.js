import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'BLOG_INIT':
            return action.blogs
        default:
            return state
    }
}

export const blogsInitialize = () => {
    return async (dispatch) => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'BLOG_INIT',
            blogs
        })
    }
}

export default blogReducer