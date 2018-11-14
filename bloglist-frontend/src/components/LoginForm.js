import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => (
  <form onSubmit={handleSubmit}>
  <div>
    username:
    <input
      type="text"
      name="username"
      value={username}
      onChange={handleChange}
    />
  </div>
  <div>
    password:
    <input
      type="password"
      name="password"
      value={password}
      onChange={handleChange}
    />
  </div>
  <button type="submit">Log in</button>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm