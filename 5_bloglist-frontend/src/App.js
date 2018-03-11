import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Message from './components/Message'
import Blog from './components/Blog'
import Users from './components/Users'
import { connect } from 'react-redux'
import { notify } from './reducers/notificationReducer'
import { usersInitialize } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { blogsInitialize } from './reducers/blogReducer'
import Nav from './components/Nav'
import BlogList from './components/BlogList';
import { login, logout, setUser } from './reducers/loginReducer'
import { Table } from 'semantic-ui-react'

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
      url: ''
    }
  }

  componentDidMount() {
    this.props.usersInitialize()
    this.props.blogsInitialize()
    blogService.getAll().then(blogs =>
      this.setState({ blogs: this.sortByLikes(blogs) })
    )
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.props.setUser(user)
      //blogService.setToken(user.token)
      //this.setState({ user })
    }
  }

  /*login = async (event) => {
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
      this.props.login(this.state.username, this.state.password)
      this.props.notify(`welcome ${this.props.user.name}`, false, 5)
    } catch (exception) {
      this.props.notify('Incorrect username or password', true, 5)
    }
  }*/

  /*setMessage = (message, isError) => {
    this.setState({
      message,
      isError
    })
    setTimeout(() => {
      this.setState({ message: null, isError: false })
    }, 5000)
  }*/

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = () => {
    //window.localStorage.removeItem('loggedBlogAppUser')
    this.props.logout()
    //this.setState({ user: null })
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
      this.props.notify(`Added new blog, ${blog.title} by ${blog.author}`, false)
    } catch (exception) {
      this.props.notify('Item must have a title and url', true)
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

  blogById = (id) => {
    const blog = this.props.blogs.find(b => b._id === id)
    return blog
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

    const home = () => (
      <div>
        <h2>blogs</h2>
        <div style={{ paddingBottom: 20 }} ><BlogForm /></div>
        <BlogList />
      </div>
    )

    /*const notLogged = () => (
      <Login
        onSubmit={this.login}
        handleLoginFieldChange={this.handleFieldChange}
        usernameValue={this.state.username}
        passwordValue={this.state.password}
      />
    )*/

    const notLogged = () => (
      <Login />
    )



    return (
      <Container>
        <div>
          <Router>
            <div>
              {this.props.user ?
                <div>
                  <Nav />
                  {this.props.notifications.length === 0 ? '' : this.props.notifications.map(n => <Message key={n.id} message={n.content} error={n.error}>{n}</Message>)}
                  <div>
                    <Route exact path='/' render={() => home()} />
                    <Route exact path="/users" render={() => <Users />} />
                    <Route exact path='/blogs/:id' render={({ match, history }) => <Blog blog={this.blogById(match.params.id)} history={history} />} />
                    <Route exact path='/users/:id' render={({ match }) => <User user={this.props.users.find(u => u._id === match.params.id)} />} />
                  </div>
                </div> :
                <div>
                  <Route exact path='/' render={() => <Login />} />
                  <Route exact path='/users' render={() => <Login />} />
                  <Route exact path='/blogs/:id' render={() => <Login />} />
                  <Route exact path='/users/:id' render={() => <Login />} />
                </div>
              }
            </div>
          </Router>
        </div>
      </Container>
    );
  }
}

const User = ({ user }) => {
  if (!user) {
    return <div>loading</div>
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Added blogs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {user.blogs.map(blog =>
            <Table.Row key={blog._id}>
              <Table.Cell >
                <Link to={`/blogs/${blog._id}`} >{blog.title}</Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
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

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
    users: state.users,
    blogs: state.blogs,
    user: state.user
  }
}

const actions = {
  notify,
  usersInitialize,
  blogsInitialize,
  login,
  logout,
  setUser
}

export default connect(mapStateToProps, actions)(App)