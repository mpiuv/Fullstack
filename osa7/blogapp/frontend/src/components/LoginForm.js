import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onLogin(username, password)
  }

  return (
    <div>
      <h2>Log in to application</h2>

      <form onSubmit={handleSubmit}>
        <div>
        <div>
          <TextField label="username" />
        </div>
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            id='username'
          />
        </div>
        <div>
        <div>
          <TextField label="password" type='password' />
        </div>

          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm