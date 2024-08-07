import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function MyRecipes({ username }) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchMyRecipes = async () => {
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

        fetchMyRecipes();
    }, [username]);

    const handleDeleteRecipe = async (recipeId) => {
        try {
            const response = await fetch(`/delete_recipe/${recipeId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (response.ok) {
                // Filter out the deleted recipe from the recipes list
                setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
                console.log('Recipe deleted successfully');
            } else {
                console.error('Error deleting recipe:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-rose-200 py-8 px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">My Recipes</h2>
            <ul className="space-y-4">
                {recipes.map(recipe => (
                    <li key={recipe.id} className="p-6 bg-rose-200 shadow-md rounded-md border-rose-950 b_glow">
                        <h3 className="text-xl font-semibold mb-2">Recipe Name: {recipe.name}</h3>
                        <p className="text-slate-950 mb-4"><b>DESCRIPTION:</b> {recipe.description}</p>
                        <div className="flex space-x-4">
                            <Link 
                                to={`/edit_recipe/${username}/${recipe.id}`} 
                                className="bg-rose-950 text-white py-2 px-4 rounded hover:bg-rose-900 transition duration-200"
                            >
                                Edit
                            </Link>
                            <button 
                                onClick={() => handleDeleteRecipe(recipe.id)} 
                                className="bg-rose-950 text-white py-2 px-4 rounded hover:bg-rose-900 transition duration-200"
                            >
                                Delete Recipe
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyRecipes;
