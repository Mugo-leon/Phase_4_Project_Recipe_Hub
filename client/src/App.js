// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import CreateUser from './CreateUser';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';

 

function App() {
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (loggedInUsername) => {
        setUsername(loggedInUsername);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setUsername('');
        setIsLoggedIn(false);
    };

    return (
        <Router>
            <div className="App">
                <Navbar 
                    username={username} 
                    isLoggedIn={isLoggedIn}
                    onLogout={handleLogout}
                />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-user" element={<CreateUser />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={<Dashboard username={username} onLogout={handleLogout} />} />
                    
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;