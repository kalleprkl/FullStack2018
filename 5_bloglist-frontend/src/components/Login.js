import React from 'react'

const Login = ({ usernameValue, passwordValue, handleLoginFieldChange, onSubmit }) => {
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
  }

  export default Login