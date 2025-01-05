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
        <div className="min-h-screen flex flex-col items-center justify-center bg-stone-900">
            <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-sm'>
                <div className='text-center mb-4'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke-width="1.5" 
                        stroke="currentColor" 
                        class="inline-block h-7 w-7 mr-2 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <a className="font-bold text-3xl text-center text-red-600 mb-4 font-mono">Instagram</a>
                </div>
                <p className="text-center text-gray-600 mb-6">Login to your account</p>
                <form onSubmit={login}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder='Enter your email' required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder='Enter your password' required />
                    </div>
                    <div className='text-center underline cursor-pointer'>
                        <h3>Forgot password?</h3>
                    </div>
                    <button type='submit' className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg mt-4">
                        Login
                    </button>
                    <div className='text-center cursor-pointer mt-4'>
                        <h3 onClick={() => navigate("/register")}  className='text-indigo-700 font-semibold'>Don't have an account?</h3>
                    </div>
                    {/* display error message if login fails */}
                    {errorMessage && (<div className="pt-4 mb-4 text-red-500 text-sm text-center">{errorMessage}</div>)}
                </form>
            </div>
            
        </div>
    
  )
}

export default LoginPage