import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../../services/authService'
import style from './_login-page.module.scss'

export const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    await authService.login({ email, password })
    navigate('/')
  }

  return (
    <section className={style['login-page']}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email</label> <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label> <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
      <p>
        dont have an account? <Link to={'/signup'}>Sign up now</Link>
      </p>
    </section>
  )
}
