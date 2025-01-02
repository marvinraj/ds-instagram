import React from 'react'

function LoginPage() {
  return (
    <div>
        <h3>Login Page</h3>
        <form>
            <div>
                <label>Email</label>
                <input type="text" placeholder='Enter your email' required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" placeholder='Enter your password' required />
            </div>
            <button>
                Login
            </button>
        </form>
    </div>
    
  )
}

export default LoginPage