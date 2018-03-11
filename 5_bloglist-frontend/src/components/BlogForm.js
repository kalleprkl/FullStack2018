import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { createNewBlog } from './../reducers/blogReducer'


class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      //user: this.props.users.find(u => u._id === this.props.user._id)
    }
    this.props.createNewBlog(blog, this.props.users.find(u => u._id === this.props.user._id))
    this.toggleVisible()
  }

  toggleVisible = () => {
    this.setState({
      visible: !this.state.visible
    })
  }

  render() {

    return (
      <div>
        {this.state.visible ?
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              title
          <input name='title' />
            </Form.Field>
            <Form.Field>
              author
          <input name='author' />
            </Form.Field>
            <Form.Field>
              url
          <input name='url' />
            </Form.Field>
            <Button type='submit'>create</Button>
            <Button type='button' onClick={this.toggleVisible} >cancel</Button>
          </Form>
          :
          <Button onClick={this.toggleVisible}>create new</Button>}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
      users: state.users
  }
}

export default connect(mapStateToProps, { createNewBlog })(BlogForm)