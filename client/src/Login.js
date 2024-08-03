import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import glasses from './glasses.jpg';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                setLoginMessage('Login Successful');
                onLogin(username);
                setTimeout(() => {
                    setLoginMessage(''); // Clear the success message after a certain time
                    navigate('/dashboard');
                }, 2000);
            } else {
                setMessage(data.message || 'Error logging in');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error logging in');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage:  `url(${glasses})` }}>
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md bg-opacity-50  border-rose-950 b_glow">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    {message && <p className="text-rose-300 mb-4">{message}</p>}
                    {loginMessage && <p className="text-rose-300 mb-4">{loginMessage}</p>}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            className="mt-2 p-2 w-full border rounded-md" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-950">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            className="mt-2 p-2 w-full border rounded-md" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-rose-950 text-white py-2 px-4 rounded-md hover:bg-rose-950 transition-colors duration-200">
                            Login
                        </button>
                        <Link to="/create-user" className="text-rose-950 hover:underline">Don't have an Account? SignUp Here!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
