import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import glasses from './glasses.jpg';


function CreateUser() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            username: username,
            password: password
        };

        try {
            const response = await fetch('/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            if (response.ok) {
                setMessage('User Created Successfully');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setMessage('Error creating user');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error creating user');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${glasses})` }}>
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md bg-opacity-50  border-rose-950 b_glow">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    {message && <p className="text-green-500 mb-4">{message}</p>}
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-slate-950">Username</label>
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
                        <label htmlFor="password" className="block text-slate-950">Password</label>
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
                        <button type="submit" className="bg-rose-950 text-white py-2 px-4 rounded-md hover:bg-rose-300 transition-colors duration-200">
                            Sign Up
                        </button>
                        <Link to="/login" className="text-rose-950 hover:underline">Already have an Account? Login Here!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
