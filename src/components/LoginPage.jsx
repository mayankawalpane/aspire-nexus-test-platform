import { useState } from 'react'
import { setSession, registerUser, loginUser } from '../lib/auth'
import './LoginPage.css'

function LoginPage({ onAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const switchMode = (next) => {
    setMode(next)
    setError('')
    setPassword('')
    setConfirmPassword('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setBusy(true)
    try {
      let result
      if (mode === 'register') {
        result = registerUser(email, password)
        if (!result.success) {
          setError(result.message)
          setBusy(false)
          return
        }
      } else {
        result = loginUser(email, password)
        if (!result.success) {
          setError(result.message)
          setBusy(false)
          return
        }
      }
      
      setSession(email)
      onAuth(email)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-brand">Aspire Nexus</div>
        <h1>{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
        <p className="login-sub">
          {mode === 'login'
            ? 'Log in to access your placement preparation courses.'
            : 'Register to enroll in the mock practice test.'}
        </p>

        <div className="login-tabs">
          <button
            className={`login-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => switchMode('login')}
            type="button"
          >
            Login
          </button>
          <button
            className={`login-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => switchMode('register')}
            type="button"
          >
            Register
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder={mode === 'register' ? 'At least 6 characters' : 'Your password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              required
            />
          </div>

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="login-confirm">Confirm Password</label>
              <input
                id="login-confirm"
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {error && <p className="login-error">{error}</p>}

          <button className="login-submit" type="submit" disabled={busy}>
            {busy ? 'Please wait…' : mode === 'login' ? 'Login' : 'Register & Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
