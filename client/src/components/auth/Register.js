import React, { useState } from 'react'
import server from '../../apis/serverApi'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const { 
    name,
    email,
    password,
    password2
  } = formData

  const onChange = e => setFormData({
    ...formData, 
    [e.target.name]: e.target.value
  })

  const onSubmit = async e => {
    e.preventDefault()
    if (password !== password2) {
      console.log('password didnt match');
    } else {
      const newUser = {
        name,
        email,
        password
      }

      try {
        const result = await server.post('/api/users/register', newUser, {})
        console.log(result.data);
      } catch (error) {
        console.error(error.response.data)
      }
    }
  }

  return (
    <div className='container'>
      <h1 className="large text-primary">Sign Up</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              required 
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              placeholder="Email Address" 
              name="email" 
              value={email} 
              onChange={e => onChange(e)}
            />
            <small className="form-text"
              >This site uses Gravatar so if you want a profile image, use a
              Gravatar email</small
            >
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
    </div>
  )
}

export default Register
