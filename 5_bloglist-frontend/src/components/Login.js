import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { login } from './../reducers/loginReducer'
import { notify } from './../reducers/notificationReducer'

class Login extends React.Component {

  submit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''
    this.props.login(username, password)
    /*try {
      const username = event.target.username.value
      const password = event.target.password.value
      event.target.username.value = ''
      event.target.password.value = '' 
      await this.props.login(username, password)
      
      this.props.notify(`welcome ${this.props.user.name}`, false)
      //console.log('jeebuu')
    } catch (exception) {
      this.props.notify('Incorrect username or password', true)
    }*/
  }

  render() {
    return (
      <Form onSubmit={this.submit}>
        <Form.Field>
          username
        <input name='username' />
        </Form.Field>
        <Form.Field>
          password
        <input name='password' />
        </Form.Field>
        <Button type='submit'>
          login
        </Button>
      </Form>
    )
  }
}

/*const Login = ({ usernameValue, passwordValue, handleLoginFieldChange, onSubmit }) => {
    return (
      <form onSubmit={onSubmit}>
        <div>
          <input
            type='text'
            name='username'
            value={usernameValue}
            onChange={handleLoginFieldChange}
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            value={passwordValue}
            onChange={handleLoginFieldChange}
          />
        </div>
        <button>login</button>
      </form>
    )
}*/

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const actions = {
  login,
  notify
}

export default connect(mapStateToProps, actions)(Login)