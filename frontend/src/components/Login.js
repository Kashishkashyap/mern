import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Register from './Register';
const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {
    console.log("Login")
    e.preventDefault();
    const response = await fetch(`https://mern-zeta-blush.vercel.app/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    console.log(response)
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);

      localStorage.setItem('userId', json.userId);
      console.log(json.authToken)
      navigate('/dashboard');
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <>

      <div className="container">
        <h1>Login</h1>
        <form className="container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" onChange={onChange} value={credentials.email} name="email" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} value={credentials.password} id="password" name="password" />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        <h2 className="mt-5">Register</h2>
        <Register />
      </div>
    </>
  )
}

export default Login
