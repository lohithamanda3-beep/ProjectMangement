import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, GraduationCap, UserPlus, ArrowLeft } from 'lucide-react'

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    studentId: '',
    department: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Validation
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (formData.role === 'student' && !formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required'
    }
    
    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        studentId: formData.studentId,
        department: formData.department,
        createdAt: new Date().toISOString()
      }
      
      // Store user data (in a real app, this would be sent to a backend)
      localStorage.setItem('user', JSON.stringify(newUser))
      onSignup(newUser)
      setIsLoading(false)
    }, 1000)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <UserPlus size={48} className="login-icon" />
          <h1>Create Account</h1>
          <p>Join the project management platform</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={errors.name ? 'error' : ''}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
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
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

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

          {formData.role === 'student' && (
            <div className="form-group">
              <label htmlFor="studentId">Student ID:</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter your student ID"
                className={errors.studentId ? 'error' : ''}
                required
              />
              {errors.studentId && <span className="error-message">{errors.studentId}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="department">Department:</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={errors.department ? 'error' : ''}
              required
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Business Administration">Business Administration</option>
              <option value="Engineering">Engineering</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Other">Other</option>
            </select>
            {errors.department && <span className="error-message">{errors.department}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={errors.password ? 'error' : ''}
              required
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={errors.confirmPassword ? 'error' : ''}
              required
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="login-btn" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-switch">
          <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
        </div>

        <div className="demo-credentials">
          <p><strong>Demo Mode:</strong> All signups are accepted for testing purposes</p>
        </div>
      </div>
    </div>
  )
}

export default Signup
