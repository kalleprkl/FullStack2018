import React from 'react'

const BlogForm = ({ newBlog, handleFieldChange, title, author, url }) => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={newBlog}>
          <div>
            title: &nbsp;
            <input
              name='title'
              type='text'
              value={title}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            author: &nbsp;
            <input
              name='author'
              type='text'
              value={author}
              onChange={handleFieldChange}
            />
          </div>
          <div>
            url: &nbsp;
            <input
              name='url'
              type='text'
              value={url}
              onChange={handleFieldChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    )
  }

  export default BlogForm