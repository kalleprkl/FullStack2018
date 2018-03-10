import React from 'react'

const Blog = ({ blog }) => {
    console.log(blog)
    if (!blog) {
        return <div>loading</div>
    }
    return (
        <div>
            <p>{blog.title}</p>
            <p>{blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes}</p>
            <p>{blog.user.name}</p>
        </div>
    )
}

export default Blog