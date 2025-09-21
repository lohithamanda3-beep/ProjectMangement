import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, GraduationCap } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple authentication - in a real app, this would connect to a backend
    const mockUsers = {
      admin: { id: 1, name: 'Dr. Smith', email: 'admin@university.edu', role: 'admin' },
      student: { id: 2, name: 'John Doe', email: 'student@university.edu', role: 'student' }
    }

    if (formData.email && formData.password) {
      onLogin(mockUsers[formData.role])
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <GraduationCap size={48} className="login-icon" />
          <h1>Project Management Platform</h1>
          <p>Sign in to manage your group projects</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <div className="role-selector">
              <button
                type="button"
                className={`role-btn ${formData.role === 'student' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'student' })}
              >
                <Users size={20} />
                Student
              </button>
              <button
                type="button"
                className={`role-btn ${formData.role === 'admin' ? 'active' : ''}`}
                onClick={() => setFormData({ ...formData, role: 'admin' })}
              >
                <GraduationCap size={20} />
                Teacher
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>

        <div className="auth-switch">
          <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
        </div>

        <div className="demo-credentials">
          <p><strong>Demo Credentials:</strong></p>
          <p>Any email/password combination will work for demo purposes</p>
        </div>
      </div>
    </div>
  )
}

export default Login
