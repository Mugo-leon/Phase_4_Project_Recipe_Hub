import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, onLogout, username }) {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        onLogout();
    };

    const fetchUserRecipes = async () => {
        try {
            const response = await fetch(`/get_user_recipes/${username}`);
            const data = await response.json();
            if (response.ok) {
                setRecipes(data.recipes);
            } else {
                console.error('Error fetching user recipes:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchUserRecipes();
        }
    }, [isLoggedIn, username]);

    return (
        <nav className="bg-slate-950 p-4">
            <div className="container mx-auto">
                <ul className="flex justify-end space-x-4">
                    {!isLoggedIn ? (
                        <>
                            <li><Link to="/create-user" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">Create User</Link></li>
                            <li><Link to="/login" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">Login</Link></li>
                            <li><Link to="/" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">Home</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/dashboard" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">Dashboard</Link></li>
                            <li><Link to="/all-recipes" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">All Recipes</Link></li>
                            <li><Link to="/create-recipe" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">Create Recipe</Link></li>
                            <li><Link to="/my-recipes" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">My Recipes</Link></li>
                            <li><Link to="/favorite-recipes" className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">Favorite Recipes</Link></li>
                            <li><Link to="/" onClick={handleLogoutClick} className="text-rose-200 hover:bg-rose-950 px-3 py-2 rounded-md">Logout</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
