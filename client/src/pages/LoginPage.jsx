import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/", { email, password });
            if (response.data && response.data.length > 0) {
                const user_details = response.data[0];
                const username = user_details.username;
                // store in local storage
                localStorage.setItem('email', user_details.email);
                localStorage.setItem('username', username);
                localStorage.setItem('user_id', user_details.id);
                console.log(localStorage)
                navigate("/feed");
            } else {
                setErrorMessage("Incorrect username or password.");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message);
            } else {
                setErrorMessage('error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <h3>Login Page</h3>
            <form onSubmit={login}>
                <div>
                    <label>Email</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' required />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' required />
                </div>
                <button type='submit'>
                    Login
                </button>
                {/* display error message if login fails */}
                {errorMessage && (<div className="mb-4 text-red-500 text-sm text-center">{errorMessage}</div>)}
            </form>
        </div>
    
  )
}

export default LoginPage