import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Message from './components/Message'
import Blog from './components/Blog'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      message: null,
      isError: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: this.sortByLikes(blogs) })
    )
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      this.setState({
        username: '',
        password: '',
        user
      })
      this.setMessage('welcome ' + user.name)
    } catch (exception) {
      this.setMessage('Incorrect username or password', true)
    }
  }

  setMessage = (message, isError) => {
    this.setState({
      message,
      isError
    })
    setTimeout(() => {
      this.setState({ message: null, isError: false })
    }, 5000)
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    this.setState({ user: null })
  }

  newBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create(
        {
          title: this.state.title,
          author: this.state.author,
          url: this.state.url
        })

      this.setState({
        blogs: this.sortByLikes(this.state.blogs.concat(blog)),
        title: '',
        author: '',
        url: ''
      })
      this.blogForm.toggleVisibility()
      this.setMessage('Added new blog, ' + blog.title + ' by ' + blog.author)
    } catch (exception) {
      this.setMessage('Item must have a title and url', true)
    }
  }

  updateLikes = async (blog) => {
    try {
      blog.likes = blog.likes + 1
      const updatedBlog = await blogService.update(blog)
      let blogs = this.state.blogs.filter(b => b._id !== blog._id)
      blogs = blogs.concat(updatedBlog)
      this.setState({ blogs: this.sortByLikes(blogs) })
    } catch (exception) {
      console.log('Something\'s not right..')
    }
  }

  removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      const blogs = this.state.blogs.filter(b => b._id !== id)
      this.setState({ blogs: this.sortByLikes(blogs, this.s) })
    } catch (exception) {
      console.log('Something went wrong')
    }
  }

  sortByLikes = (blogs) => {
    return blogs.sort((a, b) => { return b.likes - a.likes })
  }

  render() {

    const blogForm = () => (
      <Togglable buttonLabel='new blog' ref={component => this.blogForm = component}>
        <BlogForm
          newBlog={this.newBlog}
          handleFieldChange={this.handleFieldChange}
          title={this.state.title}
          author={this.state.author}
          url={this.state.url}
        />
      </Togglable>
    )

    return (
      <div>
        {this.state.message ? <Message message={this.state.message} error={this.state.isError} /> : ''}
        {this.state.user ?
          <div>
            <div>
              logged in as {this.state.user.username} &nbsp;
              <button onClick={this.logout}>logout</button>
            </div>
            <div>
              {this.state.blogs.map(blog =>
                <Blog
                  key={blog._id}
                  blog={blog}
                  user={this.state.user}
                  update={this.updateLikes}
                  remove={this.removeBlog}
                />
              )}
            </div>
            {blogForm()}
          </div> :
          <Login
            onSubmit={this.login}
            handleLoginFieldChange={this.handleFieldChange}
            usernameValue={this.state.username}
            passwordValue={this.state.password}
          />
        }
      </div>
    );
  }
}

/*const LoggedIn = ({ username, logout, blogs, newBlog, handleBlogFieldChange, title, author, url }) => {
  return (
    <div>
      <div>
        logged in as {username} &nbsp;
        <button onClick={logout}>logout</button>
      </div>
      <Blogs blogs={blogs} />
      <BlogForm
        newBlog={newBlog}
        handleFieldChange={handleBlogFieldChange}
        title={title}
        author={author}
        url={url}
      />
    </div>
  )
}*/

export default App;
