import React from 'react'
import { connect } from 'react-redux'
import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'

class Blog extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.commentBlog(this.props.blog, event.target.comment.value)
        event.target.comment.value = ''
    }

    handleLike = () => {
        this.props.likeBlog(this.props.blog)
    }

    handleRemove = () => {
        this.props.removeBlog(this.props.blog)
        this.props.history.push('/')
    }

    render() {

        const blog = this.props.blog

        if (!blog) {
            return <div>loading</div>
        }

        const blogHasUser = () => {
            if (blog.user && blog.user._id === this.props.user._id) 
                return <p>added by {blog.user.name} <button onClick={this.handleRemove}>remove</button></p>
            if (!blog.user)
                return <button>remove</button>
        }

        return (
            <div>
                <h2>{blog.title}</h2>
                <p>{blog.author ? blog.author : 'unknown author'}</p>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>likes: {blog.likes} <button onClick={this.handleLike}>like</button></p>
                {blogHasUser()}
                <h3>comments</h3>
                <ul>
                    {blog.comments.map(comment => <li key={comment._id}>{comment.content}</li>)}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input name='comment' />
                    <button type='submit'>comment</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { commentBlog, likeBlog, removeBlog })(Blog)