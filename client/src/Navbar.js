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

    const handleRecipeDelete = async (recipeId) => {
        try {
            const response = await fetch(`/delete_recipe/${recipeId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data.message);
                // Refresh the recipes list after deletion
                fetchUserRecipes();
            } else {
                console.error('Error deleting recipe:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <nav className="bg-red-300 p-4">
            <div className="container mx-auto">
                <ul className="flex justify-end space-x-4">
                    {!isLoggedIn ? (
                        <>
                            <li><Link to="/create-user" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">Create User</Link></li>
                            <li><Link to="/login" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">Login</Link></li>
                            <li><Link to="/" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">Home</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/dashboard" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">Dashboard</Link></li>
                            <li><Link to="/all-recipes" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">All Recipes</Link></li>
                            <li><Link to="/create-recipe" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">Create Recipe</Link></li>
                            <li><Link to="/my-recipes" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">My Recipes</Link></li>
                            <li><Link to="/favorite-recipes" className="text-white hover:bg-slate-950 px-3 py-2 rounded-md">Favorite Recipes</Link></li>
                            <li><Link to="/" onClick={handleLogoutClick} className="text-red-600 hover:bg-red-800 px-3 py-2 rounded-md">Logout</Link></li>
                        </>
                    )}
                </ul>
            </div>
            <div className="border-b border-slate-950 pt-4 w-full"></div>
        </nav>
    );
}

export default Navbar;
