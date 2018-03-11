import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'BLOG_INIT':
            return sortByLikes(action.blogs)
        case 'CREATE':
            return sortByLikes([...state, action.blog])
        case 'COMMENT':
            return sortByLikes([...state.filter(b => b._id !== action.blog._id), action.blog])
        case 'LIKE':
            return sortByLikes([...state.filter(b => b._id !== action.blog._id), action.blog])
        case 'DELETE':
            return sortByLikes(state.filter(b => b._id !== action.blog._id))
        default:
            return state
    }
}

const sortByLikes = (blogs) => {
    return blogs.sort((a, b) => { return b.likes - a.likes })
  }

export const blogsInitialize = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            dispatch({
                type: 'BLOG_INIT',
                blogs
            })
        } catch (exception) {

        }
    }
}

export const createNewBlog = (params, user) => {
    return async (dispatch) => {
        try {
            const blog = await blogService.create(params)
            console.log(blog)
            blog.comments = []
            blog.user = user
            dispatch({
                type: 'CREATE',
                blog
            })
        } catch (exception) {

        }
    }
}

export const commentBlog = (blog, content) => {
    return async (dispatch) => {
        try {
            const comment = await blogService.comment(blog._id, content)
            const commentedBlog = {
                _id: blog._id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes,
                user: blog.user,
                comments: blog.comments.concat(comment)
            }
            dispatch({
                type: 'COMMENT',
                blog: commentedBlog
            })
        } catch (exception) {

        }
    }
}

export const likeBlog = (blog) => {
    return async (dispatch) => {
        try {
            const user = blog.user
            const blogToUpdate = {
                _id: blog._id,
                title: blog.title,
                author: blog.author,
                url: blog.url,
                likes: blog.likes + 1,
                user: blog.user
            }
            const updatedBlog = await blogService.update(blogToUpdate)
            updatedBlog.user = user
            dispatch({
                type: 'LIKE',
                blog: updatedBlog
            })
        } catch (exception) {

        }
    }
}

export const removeBlog = (blog) => {
    return async (dispatch) => {
        try {
            await blogService.remove(blog._id)
            dispatch({
                type: 'DELETE',
                blog
            })
        } catch (exception) {

        }
    }
}

export default blogReducer